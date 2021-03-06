import { posix as unixPath } from "path";
import {
  NO_CONTENT,
  ACCEPTED,
  CREATED,
  PRECONDITION_FAILED,
  PAYLOAD_TOO_LARGE,
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
  INSUFFICIENT_STORAGE,
  CONFLICT,
  NOT_FOUND,
} from "#environment/constants/http";
import { FetchError } from "#lib/errors";
import { sleep } from "#lib/util";
import { toJSON } from "#lib/json";
import {
  createFolder as createFolderAPI,
  getPathInfo,
  getUploadLink,
  uploadFile as uploadFileAPI,
  publishResource,
  deletePath as deletePathAPI,
  getOperationStatus,
  accessPublicResource,
} from "./api";
import { YandexDiskError } from "./errors";

import type {
  IResource,
  ILink,
  IOperationStatus,
  IStatus,
  YaDiskPath,
} from "./types";
import { YandexDiskUrl } from "#lib/url";

export function diskPathFromURL(incomingURL: string | URL) {
  const url = incomingURL instanceof URL ? incomingURL : new URL(incomingURL);

  const path = url.searchParams.get("path")!;
  const pathURL = new URL(path);
  return pathURL.pathname;
}

export async function createFolder(yadiskPath: string) {
  // console.log(`YandexDisk: creating path "${yadiskPath}".`);

  try {
    await createFolderAPI(yadiskPath);
  } catch (error) {
    // folder already exists
    const isConflictError =
      error instanceof FetchError && error.res.status === CONFLICT;

    if (!isConflictError) {
      throw error;
    }

    await createFolderRecursiveLy(unixPath.dirname(yadiskPath));
  }
}

async function createFolderRecursiveLy(yadiskPath: string) {
  const closestPath = await getClosestAvailablePath(yadiskPath);
  // console.log(`YandexDisk: closest path "${closestPath}"`);

  const pathDifference = unixPath.relative(closestPath, yadiskPath);

  const pathsToCreate = pathDifference.split("/").reduce<string[]>(
    (paths, currentSegment) => {
      const lastPath = paths[paths.length - 1];
      const currentPath = unixPath.join(lastPath, currentSegment);

      paths.push(currentPath);

      return paths;
    },
    // `closestPath` is excluded from `pathDifference`
    [closestPath]
  );
  // console.log(`Paths to create:\n${toJSON(pathsToCreate)}`);

  for await (const currentPath of pathsToCreate) {
    try {
      await createFolderAPI(currentPath);
    } catch (error) {
      // folder already exists
      const isConflictError =
        error instanceof FetchError && error.res.status === CONFLICT;

      if (!isConflictError) {
        throw error;
      }

      continue;
    }
  }
}

/**
 * Finds the closest available path relative to the one provided.
 */
async function getClosestAvailablePath(yadiskPath: string) {
  let currentPath = yadiskPath;

  while (currentPath) {
    try {
      await getPathInfo(currentPath);
      break;
    } catch (error) {
      if (!(error instanceof FetchError && error.res.status === NOT_FOUND)) {
        throw error;
      }

      const dirname = unixPath.dirname(currentPath);
      // exclude root path from closest path
      if (dirname === "/") {
        break;
      }
      currentPath = dirname;
    }
  }

  return currentPath;
}

function isResourcePublished(resource: IResource) {
  return Boolean(resource.public_url && resource.public_key);
}

/**
 *
 * @returns Public url of the uploaded file.
 */
export async function uploadFile(
  yaDiskPath: string,
  file: Buffer,
  isOverwriting: boolean = false
) {
  try {
    // ensure the file has the folder
    await ensurePath(yaDiskPath);
    const uploadLink = await getUploadLink(yaDiskPath, isOverwriting);
    const response = await uploadFileAPI(uploadLink, file);

    switch (response.status) {
      // the file was uploaded without errors.
      case CREATED:
        await publishResource(yaDiskPath);
        const resource = await getPathInfo(yaDiskPath);
        const publicResource = await accessPublicResource(resource.public_key!);
        const storageURL = new YandexDiskUrl(publicResource.file!);

        return storageURL;

      // The file was received by the server
      // but hasn't been transferred to the Yandex.Disk yet.
      case ACCEPTED: {
        await sleep(1000);
        const resource = await getPathInfo(yaDiskPath);
        const publicResource = await accessPublicResource(resource.public_key!);
        const storageURL = new YandexDiskUrl(publicResource.file!);

        return storageURL;
      }

      // Wrong range was passed in the `Content-Range` header
      // when uploading the file.
      case PRECONDITION_FAILED:

      // The file size exceeds 10 GB.
      case PAYLOAD_TOO_LARGE:

      // Server error. Try to repeat the upload.
      case INTERNAL_SERVER_ERROR:
      case SERVICE_UNAVAILABLE:

      // There's not enough free space on the user's Disk for the uploaded file.
      case INSUFFICIENT_STORAGE:

      default:
        const fetchError = await FetchError.async({ res: response });
        throw fetchError;
    }
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    const message = ["Failed to upload a file. Reason:", error].join("\n");
    throw new YandexDiskError(message, { cause: error });
  }
}

export async function deletePath(
  yaDiskPath: string,
  isPermanent: boolean = true
) {
  const response = await deletePathAPI(yaDiskPath, isPermanent);

  // ?????????? ???????????? ?????????? ???? ???????????????? 204 ?? ???????????? ??????????.
  if (response.status === NO_CONTENT) {
    return true;
  }

  // ???????? ???????????????? ???????????????????? ????????????????????, ???? ???????????? ?????????? ???? ???????????????? 202 ?? ?????????????? ???? ?????????????????????? ????????????????.
  const link: ILink = await response.json();
  const url = new URL(link.href);
  // in this response id is sent as search param
  const operationID = url.pathname.split("/").pop();

  if (!operationID) {
    throw new YandexDiskError(
      `Parameter "id" is absent from "${link.href}" url.`
    );
  }

  let status: IStatus = "in-progress";

  while (status === "in-progress") {
    const operationStatus = await getOperationStatus(operationID);
    status = operationStatus.status;

    if (status === "in-progress") {
      await sleep(1000);
    }
  }

  if (status === "failure") {
    throw new YandexDiskError(
      `Failed to delete the resource at path "${yaDiskPath}".`
    );
  }

  return true;
}

/**
 * Check for the existence of the path and creates it if it doesn't exist.
 */
async function ensurePath(yadiskPath: string) {
  // console.log(`YandexDisk: Ensuring path ${yadiskPath}`);

  try {
    await getPathInfo(yadiskPath);
  } catch (error) {
    const isEmptyPathError =
      error instanceof FetchError &&
      (error.res.status === NOT_FOUND || error.res.status === CONFLICT);

    if (!isEmptyPathError) {
      throw error;
    }

    await createFolder(yadiskPath);
  }
}

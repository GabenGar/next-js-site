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
import { FetchError, ProjectError } from "#lib/errors";
import { sleep } from "#lib/util";
import {
  createFolder as createFolderAPI,
  getPathInfo,
  getUploadLink,
  uploadFile as uploadFileAPI,
  publishResource,
  deletePath as deletePathAPI,
  getOperationStatus,
} from "./api";
import { YandexDiskError } from "./errors";

import type {
  IResource,
  ILink,
  IOperationStatus,
  IStatus,
  YaDiskPath,
} from "./types";

export function diskPathFromURL(incomingURL: string | URL) {
  const url = incomingURL instanceof URL ? incomingURL : new URL(incomingURL);

  const path = url.searchParams.get("path");
  return path;
}

export async function createFolder(yadiskPath: string) {
  try {
    const link = await createFolderAPI(yadiskPath);
    return link;
  } catch (error) {
    // rethrow non-conflict errors
    if (!(error instanceof FetchError && error.res.status === CONFLICT)) {
      throw error;
    }
    const link = await createFolderRecursiveLy(yadiskPath);
    return link;
  }
}

async function createFolderRecursiveLy(yadiskPath: string) {
  const closestPath = await getClosestAvailablePath(yadiskPath);
  const pathDifference = unixPath.relative(closestPath, yadiskPath);
  const pathsToCreate = pathDifference
    .split("/")
    .reduce<string[]>(
      (paths, currentSegment) => {
        const lastPath = paths[paths.length - 1];
        const currentPath = unixPath.join(lastPath, currentSegment);

        paths.push(currentPath);

        return paths;
      },
      [closestPath]
    )
    // removing the first path because it exists already
    .splice(0, 1);
  // @ts-expect-error type stuff
  let link: ILink = undefined;
  for await (const currentPath of pathsToCreate) {
    link = await createFolderAPI(currentPath);
  }

  return link;
}

/**
 * Finds th closest available path relative to the one provided.
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
      currentPath = unixPath.dirname(currentPath);
    }
  }

  return currentPath;
}

function isResourcePublished(resource: IResource) {
  return Boolean(resource.public_url && resource.public_key);
}

export async function uploadFile(
  yaDiskPath: string,
  file: Blob,
  isOverwriting: boolean = false
) {
  try {
    await ensurePath(yaDiskPath);
    const uploadLink = await getUploadLink(yaDiskPath, isOverwriting);
    const response = await uploadFileAPI(uploadLink, file);

    switch (response.status) {
      // the file was uploaded without errors.
      case CREATED:
        await publishResource(yaDiskPath);
        const resource = await getPathInfo(yaDiskPath);

        // the url should be present after publishing
        if (!resource.public_url) {
          const message = [
            `YandexError: no public URL available after publishing a path at \"${yaDiskPath}\".`,
          ].join("\n");
          throw new ProjectError(message);
        }

        return resource.public_url;

      // The file was received by the server
      // but hasn't been transferred to the Yandex.Disk yet.
      case ACCEPTED:

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
        const fetchError = await FetchError.async(response);
        throw fetchError;
    }
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    const message = ["Failed to upload a file. Reason:", error].join("\n");
    throw new ProjectError(message, { cause: error });
  }
}

export async function deletePath(
  yaDiskPath: string,
  isPermanent: boolean = true
) {
  const response = await deletePathAPI(yaDiskPath, isPermanent);

  // Иначе вернёт ответ со статусом 204 и пустым телом.
  if (response.status === NO_CONTENT) {
    return true;
  }

  // Если удаление происходит асинхронно, то вернёт ответ со статусом 202 и ссылкой на асинхронную операцию.
  const link: ILink = await response.json();
  const url = new URL(link.href);
  // in this response id is sent as search param
  const operationID = url.searchParams.get("id");

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
      `Failed to delete the  \`yandex.disk\` resource at path "${yaDiskPath}".`
    );
  }

  return true;
}

/**
 * Check for the existence of the path and creates it if it doesn't exist.
 */
async function ensurePath(yadiskPath: string) {
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

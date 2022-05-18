import path from "path";
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
import { toJSON } from "#lib/json";
import { sleep } from "#lib/util";
import { yaDiskfetch } from "./fetch";
import { getOperationStatus } from "./lib";

import type { IResource, ILink, IOperationStatus, IStatus } from "./types";

/**
 * Получить метаинформацию о файле или каталоге.
 *
 * @param yadiskPath Если путь указывает на каталог, в ответе также описываются ресурсы этого каталога.
 */
export async function getPathInfo(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);

  const pathInfo = await yaDiskfetch<IResource>("/v1/disk/resources", {
    init: { method: "GET" },
    searchParams,
  });

  return pathInfo;
}

export async function createFolder(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);

  const link = await yaDiskfetch<ILink>("/v1/disk/resources", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
}

/**
 * @param path
 */
export async function deletePath(path: string, isPermanent: boolean = true) {
  const searchParams = new URLSearchParams([["path", path]]);

  // Чтобы удалить ресурс не помещая в корзину, следует указать параметр `permanently=true`.
  if (isPermanent) {
    searchParams.set("permanently", "true");
  }

  const response = await yaDiskfetch<Response>("/v1/disk/resources", {
    init: { method: "DELETE" },
    searchParams,
    isJSON: false,
  });

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
    throw new ProjectError(`Parameter "id" is absent from "${link.href}" url.`);
  }

  let status: IStatus = "in-progress";

  while (status === "in-progress") {
    const operationStatus = await getOperationStatus(operationID);
    status = operationStatus.status;

    if (status === "in-progress") {
      await sleep(2000);
    }
  }

  if (status === "failure") {
    throw new ProjectError(
      `Failed to delete the  \`yandex.disk\` resource at path "${path}".`
    );
  }

  return true;
}

export async function uploadFile(
  path: string,
  file: Blob,
  isOverwriting: boolean = false
) {
  await ensurePath(path);

  const searchParams = new URLSearchParams([["path", path]]);

  if (isOverwriting) {
    searchParams.set("overwrite", "true");
  }

  try {
    // When you have given the Yandex.Disk API the desired path to the uploaded file,
    // you receive a URL for accessing the file uploader.
    const uploadLink = await yaDiskfetch<ILink>("/v1/disk/resources/upload", {
      init: {
        method: "GET",
      },
      searchParams,
    });

    // The file should be sent using the PUT method to the upload URL,
    // within 30 minutes of getting this URL
    // (after 30 minutes, the link stops working
    // and it will have to be requested again).
    // The OAuth token isn't necessary for uploading to the storage.
    const response = await fetch(uploadLink.href, {
      method: uploadLink.method,
      body: file,
    });

    switch (response.status) {
      // the file was uploaded without errors.
      case CREATED:
        await publishResource(path);
        const resource = await getPathInfo(path);

        // the url should be present after publishing
        if (!resource.public_url) {
          const message = [
            `YandexError: no public URL available after publishing a path at \"${path}\".`,
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

function isResourcePublished(resource: IResource) {
  return Boolean(resource.public_url && resource.public_key);
}

/**
 * A resource becomes accessible by a direct link. You can only publish a resource using the file owner's OAuth token.
 */
async function publishResource(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);
  const link = await yaDiskfetch<ILink>("/v1/disk/resources/publish", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
}

/**
 * The resource loses the `public_key` and `public_url` attributes, and the public links to it stop working. To close access to the resource, you need the resource owner's OAuth token.
 */
async function closeResource(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);
  const link = await yaDiskfetch<ILink>("/v1/disk/resources/unpublish", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
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

    console.log("Unknown Error: ", error);

    await createFolder(yadiskPath);
  }
}

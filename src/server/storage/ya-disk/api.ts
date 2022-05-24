import { CONFLICT } from "#environment/constants/http";
import { FetchError } from "#lib/errors";
import { yaDiskfetch } from "./fetch";

import type {
  IDisk,
  IOperationStatus,
  IResource,
  ILink,
  IStatus,
} from "./types";

export async function fetchDisk() {
  const diskData = await yaDiskfetch<IDisk>("/v1/disk", {
    init: {
      method: "GET",
    },
  });

  return diskData;
}

export async function getOperationStatus(operationID: string) {
  const operationStatus = await yaDiskfetch<IOperationStatus>(
    `/v1/disk/operations/${operationID}`,
    {
      init: {
        method: "GET",
      },
    }
  );

  return operationStatus;
}

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
 * When you have given the Yandex.Disk API the desired path to the uploaded file,
 * you receive a URL for accessing the file uploader.
 * @returns
 */
export async function getUploadLink(
  yadiskPath: string,
  isOverwriting: boolean = false
) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);

  if (isOverwriting) {
    searchParams.set("overwrite", "true");
  }

  const uploadLink = await yaDiskfetch<ILink>("/v1/disk/resources/upload", {
    init: {
      method: "GET",
    },
    searchParams,
  });

  return uploadLink;
}

/**
 * The file should be sent using the PUT method to the upload URL,
 * within 30 minutes of getting this URL
 * (after 30 minutes, the link stops working
 * and it will have to be requested again).
 *
 * The OAuth token isn't necessary for uploading to the storage.
 */
export async function uploadFile(uploadLink: ILink, file: Blob) {
  const response = await fetch(uploadLink.href, {
    method: uploadLink.method,
    body: file,
  });

  return response;
}

/**
 * @param yaDiskPath
 */
export async function deletePath(
  yaDiskPath: string,
  isPermanent: boolean = true
) {
  const searchParams = new URLSearchParams([["path", yaDiskPath]]);

  // Чтобы удалить ресурс не помещая в корзину, следует указать параметр `permanently=true`.
  if (isPermanent) {
    searchParams.set("permanently", "true");
  }

  const response = await yaDiskfetch<Response>("/v1/disk/resources", {
    init: { method: "DELETE" },
    searchParams,
    isJSON: false,
  });

  return response;
}

/**
 * A resource becomes accessible by a direct link.
 * You can only publish a resource using the file owner's OAuth token.
 */
export async function publishResource(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);
  const link = await yaDiskfetch<ILink>("/v1/disk/resources/publish", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
}

/**
 * The resource loses the `public_key` and `public_url` attributes, and the public links to it stop working.
 *
 * To close access to the resource, you need the resource owner's OAuth token.
 */
export async function closeResource(yadiskPath: string) {
  const searchParams = new URLSearchParams([["path", yadiskPath]]);
  const link = await yaDiskfetch<ILink>("/v1/disk/resources/unpublish", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
}

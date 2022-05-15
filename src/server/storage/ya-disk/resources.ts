import { NO_CONTENT, ACCEPTED, CREATED } from "#environment/constants/http";
import { FetchError, ProjectError } from "#lib/errors";
import { toJSON } from "#lib/json";
import { sleep } from "#lib/util";
import { yaDiskfetch } from "./fetch";
import { getOperationStatus } from "./lib";

import type { IResource, ILink, IOperationStatus, IStatus } from "./types";

/**
 * Получить метаинформацию о файле или каталоге.
 *
 * @param path Если путь указывает на каталог, в ответе также описываются ресурсы этого каталога.
 */
export async function getPathInfo(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const pathInfo = await yaDiskfetch<IResource>("/v1/disk/resources", {
    init: { method: "GET" },
    searchParams,
  });

  return pathInfo;
}

export async function createFolder(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

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
      await sleep(5000);
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
  file: string,
  isOverwriting: boolean = false
) {
  const searchParams = new URLSearchParams([["path", path]]);

  if (isOverwriting) {
    searchParams.set("overwrite", "true");
  }

  try {
    const uploadLink = await yaDiskfetch<ILink>("/v1/disk/resources/upload", {
      init: {
        method: "GET",
      },
      searchParams,
    });

    const response = await fetch(uploadLink.href, {
      method: uploadLink.method,
      body: toJSON(file),
    });

    // The API responds with the 201 Created code if the file was uploaded without errors.
    if (response.status !== CREATED) {
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

import { NO_CONTENT, ACCEPTED } from "#environment/constants/http";
import { yaDiskfetch } from "./fetch";
import type { IYaDiskResource, IYaDiskLink } from "./types";

/**
 * Получить метаинформацию о файле или каталоге.
 *
 * @param path Если путь указывает на каталог, в ответе также описываются ресурсы этого каталога.
 */
export async function getPathInfo(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const pathInfo = await yaDiskfetch<IYaDiskResource>("/v1/disk/resources", {
    init: { method: "GET" },
    searchParams,
  });

  return pathInfo;
}

export async function createFolder(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const link = await yaDiskfetch<IYaDiskLink>("/v1/disk/resources", {
    init: { method: "PUT" },
    searchParams,
  });

  return link;
}

/**
 * По умолчанию удалит ресурс в Корзину.
 * @param path
 */
export async function deletePath(path: string, isPermanent = true) {
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
  const link: IYaDiskLink = await response.json();

  return link;
}

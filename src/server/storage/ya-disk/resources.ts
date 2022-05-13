import { yaDiskfetch } from "./fetch";
import type { IYaDiskResource, IYaDiskLink } from "./types";

/**
 * Получить метаинформацию о файле или каталоге.
 *
 * @param path Если путь указывает на каталог, в ответе также описываются ресурсы этого каталога.
 */
export async function getPathInfo(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const pathInfo = await yaDiskfetch<IYaDiskResource>(
    "/v1/disk/resources",
    { method: "GET" },
    searchParams
  );

  return pathInfo;
}

export async function createFolder(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const link = await yaDiskfetch<IYaDiskLink>(
    "/v1/disk/resources",
    { method: "PUT" },
    searchParams
  );

  return link;
}

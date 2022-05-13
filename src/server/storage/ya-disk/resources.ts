import { yaDiskfetch } from "./fetch";

/**
 * Получить метаинформацию о файле или каталоге.
 *
 * @param path Если путь указывает на каталог, в ответе также описываются ресурсы этого каталога.
 */
export async function getPathInfo(path: string) {
  const searchParams = new URLSearchParams([["path", path]]);

  const pathInfo = await yaDiskfetch(
    "/v1/disk/resources",
    { method: "GET" },
    searchParams
  );

  return pathInfo;
}

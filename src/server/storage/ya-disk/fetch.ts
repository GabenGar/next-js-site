import { YANDEX_DISK_ACCESS_TOKEN } from "#environment/vars";
import { createFetch } from "#browser";

const baseURL = "https://cloud-api.yandex.net";
const customFetch = createFetch(baseURL);

export async function yaDiskfetch<BodyData>(
  path: string,
  init?: RequestInit | undefined,
  searchParams?: URLSearchParams | undefined,
  fragment?: string | undefined
) {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `OAuth ${YANDEX_DISK_ACCESS_TOKEN}`);

  const response = await customFetch(
    path,
    {
      ...init,
      headers,
    },
    searchParams,
    fragment
  );

  const data: BodyData = await response.json();
  return data;
}

function authURL(appID: string) {
  const base = "https://oauth.yandex.com";
  const path = "/authorize";
  const searchParams = new URLSearchParams([
    ["response_type", "token"],
    ["client_id", appID],
  ]);

  const url = new URL(path, base);
  url.search = searchParams.toString();

  return url;
}

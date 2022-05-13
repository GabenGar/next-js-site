import { YANDEX_DISK_ACCESS_TOKEN } from "#environment/vars";
import { createFetch } from "#browser";

interface OAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}

const baseURL = "https://cloud-api.yandex.net";
const authHeader = new Headers([
  ["Authorization", `OAuth ${YANDEX_DISK_ACCESS_TOKEN}`],
]);
const customFetch = createFetch(baseURL, { headers: authHeader });

export async function yaDiskfetch<BodyData>(
  path: string,
  init?: RequestInit | undefined,
  searchParams?: URLSearchParams | undefined,
  fragment?: string | undefined
) {
  const response = await customFetch(path, init, searchParams, fragment);

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

function parseAuthResponse(responseURL: string) {
  const url = new URL(responseURL);
  const res = new URLSearchParams(url.hash.slice(1));
  const result = Object.fromEntries(res) as unknown as OAuthResponse;
  return result;
}

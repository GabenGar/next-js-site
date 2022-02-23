import { SITE_ORIGIN } from "#environment/vars";
import { createFetch } from "#lib/util";

const baseFetch = createFetch(SITE_ORIGIN);

export async function apiV1Fetch(path: string, reqInit?: RequestInit) {
  const apiPath = `/api/v1${path}`;
  try {
    const response = await baseFetch(apiPath, reqInit);

    if (response.status === 401) {
      throw Error("Not authorized.");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export function createRequestBody<Type>(body: Type) {
  return JSON.stringify({ data: body });
}

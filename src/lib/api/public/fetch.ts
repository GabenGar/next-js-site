import { UNAUTHORIZED } from "#environment/constants/http";
import { SITE_ORIGIN } from "#environment/vars";
import { createFetch } from "#browser";
import { FetchError } from "#lib/errors";
import { toJSON } from "#lib/json";
import { setLocalStoreItem } from "#store/local";

import type { APIRequest } from "#types/api";

const baseFetch = createFetch(SITE_ORIGIN);

export async function apiV1Fetch(path: string, reqInit?: RequestInit) {
  const apiPath = `/api/v1${path}`;
  const response = await baseFetch(apiPath, reqInit);

  if (response.status === UNAUTHORIZED) {
    setLocalStoreItem<boolean>("is_registered", false);
    throw new FetchError("Not authorized.");
  }

  return response;
}

export function createRequestBody<Type>(reqBody: Type) {
  return toJSON<APIRequest<Type>>({ data: reqBody }, { isPretty: false });
}

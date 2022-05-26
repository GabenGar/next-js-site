import { Headers as NodeHeaders } from "node-fetch";
import { IS_BROWSER } from "#environment/constants";
import { FetchError } from "#lib/errors";

const Headers = IS_BROWSER ? window.Headers : NodeHeaders;

type IFetchFunction = (
  path: string,
  init?: RequestInit,
  searchParams?: URLSearchParams,
  fragment?: string
) => Promise<Response>;

const defaultSettings = {
  // Assume JSON fetches as baseline
  headers: new Headers([
    ["Content-Type", "application/json"],
    ["Accept", "application/json"],
  ]),
} as const;

/**
 * @param origin The `origin` of the upcoming fetches.
 * @returns Fetch function.
 */
export function createFetch(
  origin: string,
  defaults = defaultSettings
): IFetchFunction {
  return async (path, init?, searchParams?, fragment?) => {
    const headers = init?.headers
    // @ts-expect-error headers type
      ? mergeHeaders(defaults.headers, init.headers)
      : defaults.headers;
    const url = new URL(path, origin);

    if (searchParams) {
      url.search = searchParams.toString();
    }

    if (fragment) {
      url.hash = fragment.startsWith("#") ? fragment : `#${fragment}`;
    }

    url.searchParams.sort();
    // @ts-expect-error headers type
    const response = await fetch(url.toString(), { ...init, headers });

    if (!response.ok) {
      const error = await FetchError.async({ req: init, res: response });
      throw error;
    }

    return response;
  };
}

function mergeHeaders(defaultHeaders: Headers, extraHeaders: HeadersInit) {
  // @ts-expect-error headers type
  const resultHeaders = new Headers(defaultHeaders);
  // @ts-expect-error headers type
  const newHeaders = new Headers(extraHeaders);
  for (const [key, value] of Array.from(newHeaders)) {
    resultHeaders.append(key, value);
  }

  return resultHeaders;
}

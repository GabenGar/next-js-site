import { FetchError } from "#lib/errors";

type IFetchFunction = (
  path: string,
  init?: RequestInit,
  searchParams?: URLSearchParams,
  fragment?: string
) => Promise<Response>;

const defaultSettings = {
  // Assume JSON fetches as baseline
  headers: new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
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
    const headers = mergeHeaders(defaults.headers, init?.headers);
    const url = new URL(path, origin);

    if (searchParams) {
      url.search = searchParams.toString();
    }

    if (fragment) {
      url.hash = fragment.startsWith("#") ? fragment : `#${fragment}`;
    }

    url.searchParams.sort();

    const response = await fetch(url.toString(), { ...init, headers });

    if (!response.ok) {
      throw new FetchError(response)
    }

    return response;
  };
}

function mergeHeaders(defaultHeaders: Headers, extraHeaders?: HeadersInit) {
  const resultHeaders = new Headers(defaultHeaders);

  if (extraHeaders) {
    const newHeaders = new Headers(extraHeaders);
    for (const [key, value] of Array.from(newHeaders)) {
      resultHeaders.append(key, value);
    }
  }

  return resultHeaders;
}

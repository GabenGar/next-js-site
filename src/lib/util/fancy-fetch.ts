/**
 * @param origin The `origin` of upcoming the fetches.
 * @returns Fetch function.
 */
export function createFetch(origin: string) {
  return async (
    path: string,
    init?: RequestInit,
    searchParams?: URLSearchParams,
    fragment?: string
  ) => {
    const url = new URL(path, origin);

    if (searchParams) {
      url.search = searchParams.toString();
    }

    if (fragment) {
      url.hash = fragment.startsWith("#") ? fragment : `#${fragment}`;
    }

    url.searchParams.sort();

    const response = await fetch(url.toString(), init);

    return response;
  };
}

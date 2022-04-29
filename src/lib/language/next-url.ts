import { ProjectURL } from "#lib/url";

import type { ILocaleInfo } from "./types";

export function createNextURL(
  localeInfo: ILocaleInfo,
  pathname: string
): ProjectURL {
  return new ProjectURL(localeInfo, pathname);
}

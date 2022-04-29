import { SITE_ORIGIN } from "#environment/vars";
import { ProjectURL } from "#lib/util";

import type { ILocaleInfo } from "./types";

export function createNextURL(localeInfo: ILocaleInfo, pathname: string): URL {
  const { defaultLocale, locale: currentLocale } = localeInfo;
  const locale = currentLocale === defaultLocale ? "" : `/${currentLocale}`;
  const path = `${locale}${pathname}`;

  return new URL(path, SITE_ORIGIN);
}

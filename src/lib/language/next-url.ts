import { SITE_ORIGIN } from "#environment/vars";

import type { BCPLangTag } from "./types";

interface ILocaleInfo {
  locale: BCPLangTag;
  defaultLocale: BCPLangTag;
}

export function createNextURL(localeInfo: ILocaleInfo, pathname: string): URL {
  const { defaultLocale, locale: currentLocale } = localeInfo;
  const locale = currentLocale === defaultLocale ? "" : `/${currentLocale}`;
  const path = `${locale}${pathname}`;

  return new URL(path, SITE_ORIGIN);
}

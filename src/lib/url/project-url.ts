import { SITE_ORIGIN } from "#environment/vars";
import { ProjectError } from "#lib/errors";

import type { ILocaleInfo } from "#lib/language";

/**
 * A locale-aware `URL` with {@link SITE_ORIGIN `SITE_ORIGIN`} as `base` argument.
 * @TODO proper locale handling
 */
export class ProjectURL extends URL {
  locale: ILocaleInfo["locale"];
  defaultLocale: ILocaleInfo["defaultLocale"];
  isDefaultLocale: boolean;

  static fromProjectURL(url: ProjectURL, path?: string) {
    if (!(url instanceof ProjectURL)) {
      throw new ProjectError('The url has to be an instance of "ProjectURL"');
    }

    const newURL = new ProjectURL(url, url);

    if (path) {
      const { locale, isDefaultLocale } = newURL;
      const localePrefix = isDefaultLocale ? "" : `/${locale}`;
      newURL.pathname = `${localePrefix}${path}`;
    }

    return newURL;
  }

  /**
   * @param url A locale-unaware absolute url string or an URL object
   */
  constructor({ locale, defaultLocale }: ILocaleInfo, url: string | URL) {
    super(url, SITE_ORIGIN);

    this.locale = locale;
    this.defaultLocale = defaultLocale;

    const isDefaultLocale = locale === defaultLocale;
    this.isDefaultLocale = isDefaultLocale;

    if (!isDefaultLocale) {
      this.pathname = `/${locale}${this.pathname}`;
    }
  }
  /**
   * @returns A URL suitable for use in a `<meta rel="canonical">` tag.
   */
  toCanonical() {
    const newURL = new URL(this);
    newURL.search = "";
    newURL.hash = "";

    return newURL;
  }
}

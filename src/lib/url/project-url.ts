import { SITE_ORIGIN } from "#environment/vars";
import { ProjectError } from "#lib/errors";

import type { ILocaleInfo } from "#lib/language";

/**
 * A locale-aware `URL` with {@link SITE_ORIGIN `SITE_ORIGIN`} as `base` argument.
 */
export class ProjectURL extends URL {
  locale: ILocaleInfo["locale"];
  defaultLocale: ILocaleInfo["defaultLocale"];

  static fromProjectURL(url: ProjectURL, path: string) {
    if (!(url instanceof ProjectURL)) {
      throw new ProjectError('The url has to be an instance of "ProjectURL"');
    }

    const newURL = new ProjectURL(url, url);

    if (newURL.locale !== newURL.defaultLocale) {
      newURL.pathname = `/${newURL.locale}${path}`;
    } else {
      newURL.pathname = path;
    }

    return newURL;
  }

  /**
   * @param url A locale-unaware url string or an URL object
   */
  constructor(url: string | URL, { locale, defaultLocale }: ILocaleInfo) {
    super(url, SITE_ORIGIN);

    this.locale = locale;
    this.defaultLocale = defaultLocale;

    if (locale !== defaultLocale) {
      this.pathname = `/${locale}${this.pathname}`;
    }
  }

  /**
   * @returns A URL suitable for use in a `<meta rel="canonical">` tag.
   */
  asCanonical() {
    const newURL = new ProjectURL(this, this);
    newURL.search = "";
    newURL.hash = "";

    return newURL;
  }
}

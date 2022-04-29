import { SITE_ORIGIN } from "#environment/vars";

import type { ILocaleInfo } from "#lib/language";

/**
 * `URL` but automatically sets {@link SITE_ORIGIN `SITE_ORIGIN`} as `base` argument.
 */
export class ProjectURL extends URL {
  constructor(url: string | URL) {
    super(url, SITE_ORIGIN);
  }
}

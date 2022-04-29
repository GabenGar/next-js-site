import {
  MOVED_PERMANENTLY,
  FOUND,
  SEE_OTHER,
  TEMPORARY_REDIRECT,
  PERMANENT_REDIRECT,
} from "#environment/constants/http";
import { ILocaleInfo } from "#lib/language";
import { ProjectURL } from "#lib/url";

import type { Redirect as NextRedirect } from "next";

const redirectStatuses = [
  MOVED_PERMANENTLY,
  FOUND,
  SEE_OTHER,
  TEMPORARY_REDIRECT,
  PERMANENT_REDIRECT,
] as const;

type IRedirectStatus = typeof redirectStatuses[number];

/**
 * Not extending the next `Redirect` because it's a type union and annoying to implement.
 * Using the `statusCode` because redirects on SSR
 * do frequently require changing method.
 *
 * @TODO fix types
 */
interface IRedirect {
  redirect: {
    destination: string;
    statusCode?: IRedirectStatus;
    basePath?: false;
  };
}

export class Redirect implements IRedirect {
  redirect: {
    destination: string;
    statusCode: 301 | 302 | 303 | 307 | 308;
    basePath?: false;
  };

  constructor(
    localeInfo: ILocaleInfo,
    destination: string,
    statusCode: IRedirectStatus = FOUND,
    basePath: false = false
  ) {
    this.redirect = {
      destination: new ProjectURL(localeInfo, destination).toString(),
      statusCode: statusCode,
      basePath: basePath,
    };
  }
}

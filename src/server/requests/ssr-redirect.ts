import {
  MOVED_PERMANENTLY,
  FOUND,
  SEE_OTHER,
  TEMPORARY_REDIRECT,
  PERMANENT_REDIRECT,
} from "#environment/constants/http";
import { ILocaleInfo } from "#lib/language";
import { ProjectURL } from "#lib/url";

import type {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  Redirect as NextRedirect,
} from "next";

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
 * do frequently require changing a method.
 */
interface IRedirect {
  redirect: {
    destination: string;
    statusCode: IRedirectStatus;
    basePath?: false;
  };
}

/**
 * Used in place of {@link NextRedirect `Redirect`} interface
 */
export class Redirect implements IRedirect {
  redirect: {
    destination: string;
    statusCode: IRedirectStatus;
    basePath?: false;
  };

  /**
   * An alt constructor to get the locale straight from the request context.
   */
  static fromContext(
    context: GetServerSidePropsContext | GetStaticPropsContext,
    destination: string,
    statusCode: IRedirectStatus = FOUND,
    basePath: false = false
  ) {
    const { locale, defaultLocale } = context;
    const localeInfo = {
      defaultLocale: defaultLocale!,
      locale: locale!,
    };

    return new this(localeInfo, destination, statusCode, basePath);
  }

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

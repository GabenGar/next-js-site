import Router from "next/router";
import { NextRequest } from "next/server";
import { SITE_ORIGIN } from "#environment/vars";
import { IS_BROWSER } from "#environment/constants";
import { ProjectError } from "#lib/errors";

import type { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import type { BCPLangTag } from "./types";

interface Props {
  req?: NextRequest;
  context?: GetServerSidePropsContext | GetStaticPropsContext;
  localeInfo?: {
    locale: BCPLangTag;
    defaultLocale: BCPLangTag;
  };
}

export function createNextURL(
  { req, context, localeInfo }: Props,
  pathname: string
): URL {
  if (!IS_BROWSER && context) {
    const { defaultLocale, locale: currentLocale } = context;
    const locale = currentLocale === defaultLocale ? "" : `/${currentLocale!}`;

    const path = `${locale}${pathname}`;

    return new URL(path, SITE_ORIGIN);
  }

  if (!IS_BROWSER && req) {
    const { locale: currentLocale, defaultLocale } = req.nextUrl.clone();
    const locale = currentLocale === defaultLocale ? "" : `/${currentLocale}`;
    const path = `${locale}${pathname}`;

    return new URL(path, SITE_ORIGIN);
  }

  if (IS_BROWSER && !localeInfo) {
    // both of these will be present on client
    const defaultLocale = Router.defaultLocale!;
    const currentLocale = Router.locale!;
    const locale = currentLocale === defaultLocale ? "" : `/${currentLocale}`;
    const path = `${locale}${pathname}`;

    return new URL(path, SITE_ORIGIN);
  }

  if (!localeInfo) {
    throw new ProjectError("`createNextURL()` should have at least `localeInfo` argument provided")
  }

  const { defaultLocale, locale: currentLocale } = localeInfo;
  const locale = currentLocale === defaultLocale ? "" : `/${currentLocale}`;
  const path = `${locale}${pathname}`;

  return new URL(path, SITE_ORIGIN);
}

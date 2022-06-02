import { FOUND } from "#environment/constants/http";
import { getServerSideTranslations } from "#lib/translation";
import { ProjectError, SessionError, AdminError } from "#lib/errors";
import { Redirect } from "#server/requests";
import { getAccountSession, getAdminSession } from "./session";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import type { BasePageProps, ISlimProps, IPageOptions } from "#types/pages";
import type { IAuthInfo } from "#lib/account";

interface IProtectedCallback<
  OwnProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
> {
  (context: GetServerSidePropsContext<Params>, authInfo: IAuthInfo): Promise<
    GetServerSidePropsResult<OwnProps>
  >;
}

/**
 * An error handling decorator for {@link GetServerSideProps} function.
 * @TODO stricter callback typing
 */
export function createServerSideProps<
  OwnProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IPageOptions,
  callback: GetServerSideProps<ISlimProps<OwnProps>, Params>
): GetServerSideProps<BasePageProps<OwnProps>, Params> {
  const { extraLangNamespaces } = options;

  async function getServerSideProps(...args: Parameters<typeof callback>) {
    const [context] = args;
    const { locale, defaultLocale } = context;
    const localization = await getServerSideTranslations(
      locale!,
      extraLangNamespaces
    );
    const localeInfo = {
      defaultLocale: defaultLocale!,
      locale: locale!,
    };

    try {
      const result = await callback(context);
      // return non-props results
      if (!("props" in result)) {
        return result;
      }

      const slimProps = await result.props;
      const newProps = {
        ...localization,
        localeInfo,
        ...slimProps,
      };

      return {
        props: newProps,
      };
    } catch (error) {
      const isProperError = error instanceof Error;

      // rethrow unknown errors
      if (!isProperError) {
        throw error;
      }

      const isProjectError = error instanceof ProjectError;

      if (!isProjectError) {
        console.error(error);

        return new Redirect(localeInfo, "/500", FOUND);
      }

      if (error instanceof SessionError) {
        console.error(error);

        return new Redirect(localeInfo, "/auth/login", FOUND);
      }

      if (error instanceof AdminError) {
        console.error(error);

        return {
          notFound: true,
        } as const;
      }

      return new Redirect(localeInfo, "/500", FOUND);
    }
  }

  return getServerSideProps;
}

/**
 * @returns `getServerSideProps()` but auth sorted out.
 */
export function createProtectedProps<
  OwnProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IPageOptions,
  callback?: IProtectedCallback<OwnProps, Params>
): GetServerSideProps<BasePageProps<OwnProps>, Params> {
  async function getProtectedProps(
    ...args: Parameters<GetServerSideProps<BasePageProps<OwnProps>, Params>>
  ) {
    const [context] = args;
    const { req, res } = context;

    const { account } = await getAccountSession(req, res);

    if (!callback) {
      return {
        props: {},
      };
    }

    const result = await callback(context, { account });

    return result;
  }

  // @ts-expect-error confused typing
  return createServerSideProps(options, getProtectedProps);
}

export function createAdminProps<
  OwnProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IPageOptions,
  callback?: IProtectedCallback<OwnProps, Params>
): GetServerSideProps<BasePageProps<OwnProps>, Params> {
  async function getServerSideProps(
    ...args: Parameters<IProtectedCallback<OwnProps, Params>>
  ) {
    const [context] = args;
    const { req, res } = context;

    const authInfo = await getAdminSession(req, res);

    if (!callback) {
      return {
        props: {},
      };
    }

    const result = await callback(context, authInfo);

    return result;
  }

  // @ts-expect-error
  return createServerSideProps(options, getServerSideProps);
}

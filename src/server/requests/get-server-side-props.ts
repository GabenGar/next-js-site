import { FOUND } from "#environment/constants/http";
import { getServerSideTranslations } from "#lib/translation";
import { ProjectError } from "#lib/errors";
import { getAccountDetails } from "#lib/account";
import { Redirect } from "#server/requests";
import { getSSRSession } from "./session";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import type { BasePageProps, ISlimProps, IPageOptions } from "#types/pages";
import type { IAccount } from "#types/entities";

interface IAuthInfo {
  account: IAccount;
}

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

  async function decorated(...args: Parameters<typeof callback>) {
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

      return new Redirect(localeInfo, "/500", FOUND);
    }
  }

  return decorated;
}

/**
 * @returns `getServerSideProps()` but auth sorted out.
 */
export function getProtectedProps<OwnProps, Params extends ParsedUrlQuery>(
  options: IPageOptions,
  callback?: IProtectedCallback<OwnProps, Params>
): GetServerSideProps<BasePageProps<OwnProps>, Params> {
  const { extraLangNamespaces } = options;

  async function getProtectedProps(
    ...args: Parameters<GetServerSideProps<BasePageProps<OwnProps>, Params>>
  ) {
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
      const session = await getSSRSession(context);
      const { account_id } = session;

      if (!account_id) {
        return new Redirect(localeInfo, "/auth/login", FOUND);
      }

      const account = await getAccountDetails(account_id);

      // should be a logging scenario
      // since non-existent ID is a server error
      // or a hacking attempt
      if (!account) {
        session.destroy();

        return {
          notFound: true,
        };
      }

      if (!callback) {
        return {
          props: {
            ...localization,
            localeInfo,
          },
        };
      }

      const result = await callback(context, { account });

      if (!("props" in result)) {
        return result;
      }

      return {
        props: {
          ...localization,
          localeInfo,
        },
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

      return new Redirect(localeInfo, "/500", FOUND);
    }
  }
  // @ts-expect-error decorated types
  return getProtectedProps;
}

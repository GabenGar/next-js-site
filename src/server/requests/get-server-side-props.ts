import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { Redirect } from "#server/requests";
import { ProjectError } from "#lib/errors";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import type { IAccount } from "#types/entities";
import type { ILocalizedProps, BasePageProps } from "#types/pages";

/**
 * Helper type for the callback.
 * Does not need to return localization info
 * because it's handled by the decorator.
 */
type ILocalizedCallback<
  Props extends ILocalizedProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Params>
) => GetServerSidePropsResult<Props>;

interface IGetServerSidePropsOptions {
  /**
   * extra translation namespaces to be used by the page
   */
  extraLangNames: string[];
}

/**
 * An error handling decorator for {@link GetServerSideProps} function.
 * @TODO stricter callback typing
 */
export function createServerSideProps<
  Props extends ILocalizedProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IGetServerSidePropsOptions,
  callback: GetServerSideProps<Props, Params>
): typeof callback {
  const { extraLangNames } = options;

  return async (...args: Parameters<typeof callback>) => {
    const [context] = args;
    const { locale, defaultLocale } = context;
    const localization = await serverSideTranslations(
      locale!,
      ["layout", "components"].concat(extraLangNames)
    );
    const localeInfo = {
      defaultLocale: defaultLocale!,
      locale: locale!,
    };

    try {
      const result = await Promise.resolve(callback(context));

      // exclude non-props results
      // @ts-expect-error next type error
      if (!result.props) {
        return result;
      }

      const newResult: { props: Props } = {
        props: {
          ...localization,
        localeInfo,
        // @ts-expect-error next type error
        ...result.props,
        }
      };

      return newResult;
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
  };
}

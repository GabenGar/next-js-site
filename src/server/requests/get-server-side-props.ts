import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { Redirect } from "#server/requests";
import { ProjectError } from "#lib/errors";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { SSRConfig } from "next-i18next";
import type { IAccount } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import type { ILocaleInfo } from "#lib/language";

export type SlimProps<Props extends BasePageProps> = Omit<
  Props,
  "localeInfo" | "_nextI18Next"
> & {
  localeInfo?: ILocaleInfo;
  _nextI18Next?: SSRConfig[keyof SSRConfig];
};

interface IGetServerSidePropsOptions {
  /**
   * Extra translation namespaces to be used by the page.
   */
  extraLangNames: string[];
}

export function createServerSideProps<
  Props extends BasePageProps = BasePageProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IGetServerSidePropsOptions,
  callback: GetServerSideProps<SlimProps<Props>, Params>
): GetServerSideProps<Props, Params>;

/**
 * An error handling decorator for {@link GetServerSideProps} function.
 * @TODO stricter callback typing
 */
export function createServerSideProps<
  Props extends BasePageProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IGetServerSidePropsOptions,
  callback: GetServerSideProps<SlimProps<Props>, Params>
): GetServerSideProps<Props, Params> {
  const { extraLangNames } = options;

  async function decorated(...args: Parameters<typeof callback>) {
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

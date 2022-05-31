import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { Redirect } from "#server/requests";
import { ProjectError } from "#lib/errors";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { BasePageProps, ISlimProps, IPageOptions } from "#types/pages";

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
    const localization = await serverSideTranslations(
      locale!,
      ["layout", "components"].concat(extraLangNamespaces)
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

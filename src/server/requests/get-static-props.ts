import { getServerSideTranslations } from "#lib/translation";

import type { ParsedUrlQuery } from "querystring";
import type { GetStaticProps } from "next";
import type { BasePageProps, ISlimProps, IPageOptions } from "#types/pages";

export function createStaticProps<
  OwnProps,
  Params extends ParsedUrlQuery = ParsedUrlQuery
>(
  options: IPageOptions,
  callback?: GetStaticProps<ISlimProps<OwnProps>, Params>
): GetStaticProps<BasePageProps<OwnProps>, Params> {
  const { extraLangNamespaces } = options;

  async function getStaticProps(
    ...args: Parameters<GetStaticProps<ISlimProps<OwnProps>, Params>>
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

    if (!callback) {
      return {
        props: {
          ...localization,
          localeInfo,
        },
      };
    }

    const result = await callback(context);

    // return non-props results
    if (!("props" in result)) {
      return result;
    }

    const slimProps = result.props;
    const newProps = {
      ...localization,
      localeInfo,
      ...slimProps,
    };

    return {
      props: newProps,
    };
  }

  // @ts-expect-error typing error
  return getStaticProps;
}

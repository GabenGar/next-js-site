import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getLanguagesOverview, getMaxLineCount } from "#lib/translation";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { LanguagesOverview } from "#lib/translation";

interface ITemplatePageProps extends BasePageProps {
  totalCount: number;
  languagesOverview: LanguagesOverview;
}

interface ITranslationPageParams extends ParsedUrlQuery {}

function TranslationPage({
  totalCount,
  languagesOverview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = "Translation status";

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content="Translation status overview." />
      </Head>
      {IS_DEVELOPMENT && <JSONView json={languagesOverview} />}
    </Page>
  );
}

export const getStaticProps: GetStaticProps<
  ITemplatePageProps,
  ITranslationPageParams
> = async (context) => {
  const { locale } = context;

  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  const totalLineCount = await getMaxLineCount();
  const languagesOverview = await getLanguagesOverview();

  return {
    props: {
      ...localization,
      totalCount: totalLineCount,
      languagesOverview: languagesOverview,
    },
  };
};

export default TranslationPage;

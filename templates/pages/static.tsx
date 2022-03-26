import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { BaseLayout as Layout } from "#components/layout";
import { JSONView } from "#components/json";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface ITemplatePageProps extends BasePageProps {}

interface ITemplatePageParams extends ParsedUrlQuery {}

function TemplatePage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page heading="template heading">
      <Head>
        <title>{siteTitle("template title")}</title>
        <meta name="description" content="template description" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {IS_DEVELOPMENT && <JSONView json={"props preview"} />}
    </Page>
  );
}

TemplatePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<ITemplatePageParams> = async (
  context
) => {
  const { locales } = context;
  const paths = locales!.map((locale) => {
    return { params: {}, locale };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ITemplatePageProps,
  ITemplatePageParams
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
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

// export default TemplatePage;

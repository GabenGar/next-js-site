import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { BaseLayout as Layout } from "#components/layout";

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
    </Page>
  );
}

TemplatePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<ITemplatePageParams> = async (
  context
) => {
  return {
    paths: [{ params: {} }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ITemplatePageProps,
  ITemplatePageParams
> = async (context) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  const data = undefined;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

// export default TemplatePage;

import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { Section } from "#components/pages";
import { BaseLayout as Layout } from "#components/layout";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";

interface ITemplatePageProps {}

interface ITemplatePageParams extends ParsedUrlQuery {}

function TemplatePage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <Section heading="template heading">
      <Head>
        <title>{siteTitle("template title")}</title>
        <meta name="description" content="template description" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    </Section>
  );
}

TemplatePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<ITemplatePageProps, ITemplatePageParams> = async (
  context
) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  const data = undefined;

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {},
  };
};

// export default TemplatePage;

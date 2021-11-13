import Head from "next/head";

import { siteTitle } from "#lib/util";
import { Section, BaseLayout as Layout } from "#components/page";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";

interface Props {}

interface Params extends ParsedUrlQuery {}

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

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
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

export default TemplatePage;

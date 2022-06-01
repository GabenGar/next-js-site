import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests"
import { Page } from "#components/pages";
import { BaseLayout as Layout } from "#components/layout";
import { JSONView } from "#components/json";

import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";

interface IProps {}

interface IParams extends ParsedUrlQuery {}

function TemplatePage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("SET TRANSLATION FILE");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: "template title",
    description: "template description",
  });

  return (
    <Page seoTags={seoTags}>
      {IS_DEVELOPMENT && <JSONView json={"props preview"} />}
    </Page>
  );
}

TemplatePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<IParams> = async ({ locales }) => {
  const paths = locales!.map((locale) => {
    return { params: {}, locale };
  });

  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps = createStaticProps<IProps, IParams>({ extraLangNamespaces: [], }, async () => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}
  };
});

// export default TemplatePage;

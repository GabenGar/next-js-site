import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
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

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

function TemplatePage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { t } = useTranslation("SET TRANSLATION FILE");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: "template title",
    description: "template description",
  });
  const title = "template title";

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

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
}) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
  ]);

  return {
    props: {
      ...localization,
      localeInfo,
    },
  };
};

// export default TemplatePage;

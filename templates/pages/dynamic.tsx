import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { BaseLayout as Layout } from "#components/layout";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

function TemplatePage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const { t } = useTranslation("SET TRANSLATION FILE");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: "template title",
    description: "template description",
  });

  return <Page seoTags={seoTags}></Page>;
}

TemplatePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
}) => {
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

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
  ]);

  return {
    props: {
      ...localization,
      locale,
      defaultLocale,
    },
  };
};

// export default TemplatePage;

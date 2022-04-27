import { useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SITE_ORIGIN } from "#environment/vars";
import { siteTitle } from "#lib/util";
import { setLocalStoreItem } from "#store/local";
import { Page } from "#components/pages";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import type { BasePageProps } from "#types/pages";

interface RegisterPageProps extends BasePageProps {}

function AuthSuccessPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("auth");
  const title = t("auth_success_title");

  useEffect(() => {
    setLocalStoreItem<boolean>("is_registered", true);
  }, []);

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("auth_success_desc")} />
        <meta httpEquiv="refresh" content={`5; url=${SITE_ORIGIN}/account`} />
      </Head>
      <p>{t("auth_success_message")}</p>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<RegisterPageProps> = async ({
  locale,
}) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "auth",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default AuthSuccessPage;

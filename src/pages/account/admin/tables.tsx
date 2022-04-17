import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { Form } from "#components/forms";
import { clearAccounts } from "#database/queries/account/admin";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface TablesPageProps extends BasePageProps {}

function TablesPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { t } = useTranslation()
  const title = "Tables"

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content="Database tables overview" />
      </Head>
      <h2>Accounts</h2>
      <Form submitButton="Clear" method="POST"></Form>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<TablesPageProps> = async ({
  req, locale
}) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  if (req.method === "POST") {
    await clearAccounts();
  }

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "admin",
  ]);

  return {
    props: {
      ...localization
    },
  };
};

export default TablesPage;

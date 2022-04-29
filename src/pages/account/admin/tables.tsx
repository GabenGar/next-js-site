import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { Form } from "#components/forms";
import { clearAccounts } from "#database/queries/account/admin";
import { Page } from "#components/pages";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface TablesPageProps extends BasePageProps {}

function TablesPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const { t } = useTranslation();
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: "Tables",
    description: "Database tables overview",
  });

  return (
    <Page seoTags={seoTags}>
      <h2>Accounts</h2>
      <Form submitButton="Clear" method="POST" />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<TablesPageProps> = async ({
  req,
  locale,
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
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
    },
  };
};

export default TablesPage;

import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { createAdminProps } from "#server/requests";
import { Form } from "#components/forms";
import { clearAccounts } from "#database/queries/account/admin";
import { Page } from "#components/pages";

import type { InferGetServerSidePropsType } from "next";

interface IProps {}

function TablesPage({
  localeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    localeInfo,
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

export const getServerSideProps = createAdminProps<IProps>(
  { extraLangNamespaces: ["admin"] },
  async ({ req }) => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    if (req.method === "POST") {
      await clearAccounts();
    }

    return {
      props: {},
    };
  }
);

export default TablesPage;

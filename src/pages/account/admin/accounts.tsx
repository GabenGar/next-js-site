import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { getAccountList } from "#lib/account/admin";
import { createAdminProps } from "#server/requests";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";

import type { InferGetServerSidePropsType } from "next";
import type { IAccount } from "#types/entities";

interface AdminPageProps {
  accounts: IAccount[];
}

function AccountsPage({
  localeInfo,
  accounts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    localeInfo,
    title: "Accounts overview",
    description: "Accounts details",
  });

  return (
    <Page seoTags={seoTags}>
      <JSONView json={accounts} />
    </Page>
  );
}

export const getServerSideProps = createAdminProps<AdminPageProps>(
  { extraLangNamespaces: ["admin"] },
  async () => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const accounts = await getAccountList({ currentPage: 1, limit: 50 });

    return {
      props: {
        accounts,
      },
    };
  }
);

export default AccountsPage;

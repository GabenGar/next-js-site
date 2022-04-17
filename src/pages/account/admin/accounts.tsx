import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { getAccountList } from "#lib/account/admin";
import { withSessionSSR } from "#server/requests";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { IAccount } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {
  accounts: IAccount[];
}

function AccountsPage({
  accounts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const title = "Accounts overview";

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content="Account details" />
      </Head>
      <JSONView json={accounts} />
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AdminPageProps>(
  async ({ req, locale }) => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const accounts = await getAccountList({ currentPage: 1, limit: 50 });

    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "admin",
    ]);

    return {
      props: {
        ...localization,
        accounts,
      },
    };
  }
);

export default AccountsPage;

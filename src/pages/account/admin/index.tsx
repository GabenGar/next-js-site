import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { getAccountDetails } from "#lib/account";
import { getAccountList } from "#lib/account/admin";
import { withSessionSSR } from "#server/requests";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { Nav, NavList } from "#components/navigation";

import type { InferGetServerSidePropsType } from "next";
import type { IAccount } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {
  accounts: IAccount[];
}

function AdminPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const title = t("admin_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("admin_desc")} />
      </Head>
      <Nav>
        <NavList>
          <LinkInternal href="/account/admin/accounts">
            {t("nav_accounts")}
          </LinkInternal>
          <LinkInternal href="/account/admin/tables">
            {t("nav_comments")}
          </LinkInternal>
          <LinkInternal href="/account/admin/tables">
            {t("nav_tables")}
          </LinkInternal>
          <LinkInternal href="/account/admin/invites">
            {t("nav_invites")}
          </LinkInternal>
        </NavList>
      </Nav>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AdminPageProps>(
  async ({ req, locale }) => {
    const { account_id } = req.session;

    if (!account_id) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      req.session.destroy();

      return {
        notFound: true,
      };
    }

    if (account.role !== "administrator") {
      return {
        notFound: true,
      };
    }

    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "admin",
    ]);

    const accounts = await getAccountList({ currentPage: 1, limit: 50 });

    return {
      props: {
        ...localization,
        accounts,
      },
    };
  }
);

export default AdminPage;

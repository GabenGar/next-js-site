import Head from "next/head";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { getAccountList } from "#lib/account/admin";
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
  return (
    <Page heading={"Admin"}>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Admin" />
      </Head>
      <Nav>
        <NavList>
          <LinkInternal href="/account/admin/accounts">Accounts</LinkInternal>
          <LinkInternal href="/account/admin/tables">Tables</LinkInternal>
          <LinkInternal href="/account/admin/invites">Invites</LinkInternal>
        </NavList>
      </Nav>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AdminPageProps>(
  async ({ req }) => {
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

    const accounts = await getAccountList({ currentPage: 1, limit: 50 });

    return {
      props: {
        accounts,
      },
    };
  }
);

export default AdminPage;

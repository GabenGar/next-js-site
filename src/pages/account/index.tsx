import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { AccountCard } from "#components/cards";
import { Nav, NavItem, NavList } from "#components/navigation";
import { SVGIcon } from "#components/icons";
import styles from "./index.module.scss";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AccountPageProps extends BasePageProps {
  account: IAccountClient;
}

function AccountPage({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page heading="Account page">
      <Head>
        <title>Account page</title>
        <meta name="description" content="Account page" />
      </Head>

      <Nav>
        <NavList>
          <NavItem>
            <LinkInternal href="/account/email">
              {account.email ? "Change Email" : "Add email"}
            </LinkInternal>
          </NavItem>
          <NavItem>
            <LinkInternal href="/account/calendar">
              <SVGIcon iconID="calendar" />
              <span>Calendar</span>
            </LinkInternal>
          </NavItem>

          {IS_DEVELOPMENT && (
            <NavItem>
              <LinkInternal href="/account/admin">
                <SVGIcon iconID="screwdriver-wrench" />
                <span>Admin</span>
              </LinkInternal>
            </NavItem>
          )}
        </NavList>
      </Nav>

      <AccountCard className={styles.account} account={account} />
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AccountPageProps>(
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
    const { id, password, ...accountClient } = account;
    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

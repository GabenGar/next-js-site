import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { siteTitle } from "#lib/util";
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
  const { t } = useTranslation("account");
  const title = t("acc_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("acc_desc")} />
      </Head>

      <Nav>
        <NavList>
          {IS_DEVELOPMENT && (
            <NavItem>
              <LinkInternal href="/account/email">
                {account.email ? t("change_email") : t("add_email")}
              </LinkInternal>
            </NavItem>
          )}

          <NavItem>
            <LinkInternal href="/account/calendar">
              <SVGIcon iconID="calendar" />
              <span>{t("calendar")}</span>
            </LinkInternal>
          </NavItem>

          {account.role === "administrator" && (
            <NavItem>
              <LinkInternal href="/account/admin">
                <SVGIcon iconID="screwdriver-wrench" />
                <span>{t("admin")}</span>
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

    const { id, password, ...accountClient } = account;
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "account",
    ]);

    return {
      props: {
        ...localization,
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { toAccountClient } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { createProtectedProps } from "#server/requests";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { AccountCard } from "#components/cards";
import { Nav, NavItem, NavList } from "#components/navigation";
import { SVGIcon } from "#components/icons";
import styles from "./index.module.scss";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";

interface AccountPageProps {
  account: IAccountClient;
}

function AccountPage({
  localeInfo,
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("acc_title"),
    description: t("acc_desc"),
    canonicalPath: "/account",
  });

  return (
    <Page seoTags={seoTags}>
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

          <NavItem>
            {/* @TODO: profile icon */}
            <LinkInternal iconID="id-badge" href="/account/profile">
              {account.profile ? t("profile") : t("create_profile")}
            </LinkInternal>
          </NavItem>
        </NavList>
      </Nav>

      <AccountCard className={styles.account} account={account} />
    </Page>
  );
}

export const getServerSideProps = createProtectedProps<AccountPageProps>(
  { extraLangNamespaces: ["account"] },
  async (context, { account }) => {
    return {
      props: {
        account: toAccountClient(account),
      },
    };
  }
);

export default AccountPage;

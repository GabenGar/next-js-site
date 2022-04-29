import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getAccountDetails } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { withSessionSSR } from "#server/requests";
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
  const router = useRouter();
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("acc_title"),
    description: t("acc_desc"),
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
        localeInfo: {
          locale: locale!,
          defaultLocale: defaultLocale!,
        },
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

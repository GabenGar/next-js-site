import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { createSEOTags } from "#lib/seo";
import { getAccountDetails } from "#lib/account";
import { ProjectURL } from "#lib/url";
import { withSessionSSR } from "#server/requests";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { Nav, NavList } from "#components/navigation";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {}

function AdminPage({
  localeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("admin_title"),
    description: t("admin_desc"),
  });

  return (
    <Page seoTags={seoTags}>
      <Nav>
        <NavList>
          <LinkInternal href="/account/admin/accounts">
            {t("nav_accounts")}
          </LinkInternal>
          <LinkInternal href="/account/admin/comments">
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
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (!account_id) {
      return {
        redirect: {
          statusCode: FOUND,
          destination: new ProjectURL(localeInfo, "/auth/login").toString(),
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

    return {
      props: {
        ...localization,
        localeInfo,
      },
    };
  }
);

export default AdminPage;

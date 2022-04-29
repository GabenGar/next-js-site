import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { getAccountDetails } from "#lib/account";
import { withSessionSSR } from "#server/requests";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { Nav, NavList } from "#components/navigation";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {}

function AdminPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    locale: router.locale!,
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

    return {
      props: {
        ...localization,
        localeInfo: {
          locale: locale!,
          defaultLocale: defaultLocale!,
        },
      },
    };
  }
);

export default AdminPage;

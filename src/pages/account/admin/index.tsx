import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createAdminProps } from "#server/requests";
import { LinkInternal } from "#components/links";
import { Page } from "#components/pages";
import { Nav, NavList } from "#components/navigation";

import type { InferGetServerSidePropsType } from "next";

interface AdminPageProps {}

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

export const getServerSideProps = createAdminProps<AdminPageProps>({
  extraLangNamespaces: ["admin"],
});

export default AdminPage;

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { getAccountList } from "#lib/account/admin";
import { withSessionSSR } from "#server/requests";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";

import type { InferGetServerSidePropsType } from "next";
import type { IAccount } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {
  accounts: IAccount[];
}

function AccountsPage({
  localeInfo,
  accounts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: "Accounts overview",
    description: "Accounts details",
  });

  return (
    <Page seoTags={seoTags}>
      <JSONView json={accounts} />
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AdminPageProps>(
  async ({ req, locale, defaultLocale }) => {
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
        localeInfo: {
          locale: locale!,
          defaultLocale: defaultLocale!,
        },
        accounts,
      },
    };
  }
);

export default AccountsPage;

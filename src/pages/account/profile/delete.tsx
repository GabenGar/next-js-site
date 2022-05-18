import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import {
  deleteProfile,
  getAccountDetails,
  toAccountClient,
} from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { withSessionSSR, Redirect } from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient, IAccountProfileClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AccountPageProps extends BasePageProps {
  account: IAccountClient;
}

function AccountPage({
  localeInfo,
  errors,
  schemaValidationErrors,
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("profile_delete_title"),
    description: t("profile_delete_desc"),
    canonicalPath: "/account/profile/delete",
  });
  const profile = account.profile!;

  return (
    <Page seoTags={seoTags}>
      <Form method="POST" submitButton={t("profile_delete_confirm")}></Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AccountPageProps>(
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (!account_id) {
      return new Redirect(localeInfo, "/auth/login", FOUND);
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      req.session.destroy();

      return {
        notFound: true,
      };
    }

    if (!account.profile) {
      return new Redirect(localeInfo, "/account/profile", FOUND);
    }

    const accountClient = toAccountClient(account);
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "account",
    ]);

    if (req.method === "POST") {
      await deleteProfile(account);
      return new Redirect(localeInfo, "/account/profile", FOUND);
    }

    return {
      props: {
        ...localization,
        localeInfo,
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

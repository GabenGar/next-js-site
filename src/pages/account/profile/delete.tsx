import { useTranslation } from "next-i18next";
import { FOUND } from "#environment/constants/http";
import {
  deleteProfile,
  toAccountClient,
} from "#lib/account";
import { createSEOTags } from "#lib/seo";
import {
  Redirect,
  createProtectedProps,
} from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";

interface AccountPageProps {
  account: IAccountClient;
}

function ProfileDeletePage({
  localeInfo,
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

export const getServerSideProps = createProtectedProps<AccountPageProps>(
  { extraLangNamespaces: ["account"] },
  async (context, { account }) => {
    const { req } = context;
    const accountClient = toAccountClient(account);

    if (req.method === "POST") {
      await deleteProfile(account);
      return Redirect.fromContext(context, "/account/profile", FOUND);
    }

    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default ProfileDeletePage;

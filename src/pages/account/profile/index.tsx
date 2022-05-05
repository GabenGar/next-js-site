import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { getAccountDetails, toAccountClient } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { withSessionSSR, Redirect } from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { Text } from "#components/forms/sections";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { Heading } from "#components/headings";
import { DL, DS } from "#components/lists/d-list";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AccountPageProps extends BasePageProps {
  account: IAccountClient;
}

function AccountPage({
  localeInfo,
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("profile_title"),
    description: t("profile_desc"),
    canonicalPath: "/account/profile",
  });
  const { profile } = account;

  return (
    <Page seoTags={seoTags}>
      {!profile ? (
        <Form
          id="form-create-profile"
          name="create-profile"
          method="POST"
          action="/account/profile"
        >
          <Heading level={2}>Create a profile</Heading>
          <Text id="create-profile-full-name" name="full_name">
            Full name
          </Text>
        </Form>
      ) : (
        <Article>
          <ArticleHeader>
            <Heading level={2}>{profile.full_name ?? "Anonymous"}</Heading>
          </ArticleHeader>
          <ArticleBody>
            <DL>
              <DS dKey={"Joined"} dValue={profile.created_at} />
              <DS dKey={"Last activity"} dValue={profile.updated_at} />
            </DL>
          </ArticleBody>
        </Article>
      )}
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

    const accountClient = toAccountClient(account);
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "account",
    ]);

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

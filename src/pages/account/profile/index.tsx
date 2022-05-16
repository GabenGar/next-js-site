import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { FieldsValidationError } from "#lib/errors";
import {
  registerProfile,
  getAccountDetails,
  toAccountClient,
  validateAccountProfileInitFields,
} from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { withSessionSSR, Redirect, getReqBody } from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { FileInput, Text } from "#components/forms/sections";
import { ErrorsView } from "#components/errors";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { Heading } from "#components/headings";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient, IAccountProfileInit } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AccountPageProps extends BasePageProps {
  account: IAccountClient;
  newProfile?: IAccountProfileInit;
}

function AccountPage({
  localeInfo,
  errors,
  schemaValidationErrors,
  account,
  newProfile,
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
          encType="multipart/form-data"
        >
          <Heading level={2}>Create a profile</Heading>
          <Text
            id="create-profile-full-name"
            name="full_name"
            defaultValue={newProfile?.full_name}
          >
            Name:
          </Text>
          <FileInput
            id="create-profile-avatar-file"
            name="avatar_file"
            accept="image/*"
          >
            Avatar:
          </FileInput>
          {errors ? (
            <ErrorsView errors={errors} />
          ) : (
            schemaValidationErrors && (
              <ErrorsView errors={schemaValidationErrors} />
            )
          )}
        </Form>
      ) : (
        <Article>
          <ArticleHeader>
            <Heading level={2}>{profile.full_name ?? "Anonymous"}</Heading>
          </ArticleHeader>
          <ArticleBody>
            <DL>
              <DS
                dKey={"Joined"}
                dValue={<DateTimeView dateTime={profile.created_at} />}
              />
              <DS
                dKey={"Last activity"}
                dValue={<DateTimeView dateTime={profile.updated_at} />}
              />
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

    if (req.method === "POST") {
      const profileInit = await getReqBody<IAccountProfileInit>(req);

      try {
        await validateAccountProfileInitFields(profileInit);
      } catch (error) {
        if (!(error instanceof FieldsValidationError)) {
          throw error;
        }

        return {
          props: {
            ...localization,
            localeInfo,
            account: accountClient,
            schemaValidationErrors: error.validationErrors,
          },
        };
      }

      const { account_id, ...newProfile } = await registerProfile(
        account,
        profileInit
      );

      accountClient.profile = newProfile;

      return {
        props: {
          ...localization,
          localeInfo,
          account: accountClient,
        },
      };
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

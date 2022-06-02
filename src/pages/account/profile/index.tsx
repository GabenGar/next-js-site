import { useTranslation } from "next-i18next";
import { FieldsValidationError } from "#lib/errors";
import {
  registerProfile,
  toAccountClient,
  validateAccountProfileInitFields,
} from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { getMultipartReqBody, createProtectedProps } from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { FileInput, Text } from "#components/forms/sections";
import { ErrorsView } from "#components/errors";
import {
  Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
} from "#components/articles";
import { Heading } from "#components/headings";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import { LinkInternal } from "#components/links";
import { Image } from "#components/images";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient, IAccountProfileInit } from "#types/entities";

interface AccountPageProps {
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
            defaultValue={
              newProfile?.full_name === null ? undefined : newProfile?.full_name
            }
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
          <ArticleHeader style={{ textAlign: "center" }}>
            <Heading level={2}>{profile.full_name ?? "Anonymous"}</Heading>
            {profile.avatar_url && <Image src={profile.avatar_url} />}
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
          <ArticleFooter>
            <LinkInternal href="/account/profile/delete">
              {t("profile_delete")}
            </LinkInternal>
          </ArticleFooter>
        </Article>
      )}
    </Page>
  );
}

export const getServerSideProps = createProtectedProps<AccountPageProps>(
  { extraLangNamespaces: ["account"] },
  async ({ req }, { account }) => {
    const accountClient = toAccountClient(account);

    const isFormSubmission =
      req.method === "POST" &&
      req.headers["content-type"]?.includes("multipart/form-data");

    if (!isFormSubmission) {
      return {
        props: {
          account: accountClient,
        },
      };
    }

    const profileInit = await getMultipartReqBody<IAccountProfileInit>(req);

    try {
      await validateAccountProfileInitFields(profileInit);
    } catch (error) {
      if (!(error instanceof FieldsValidationError)) {
        throw error;
      }

      return {
        props: {
          account: accountClient,
          schemaValidationErrors: error.validationErrors,
        },
      };
    }

    const { account_id: _, ...newProfile } = await registerProfile(
      account,
      profileInit
    );

    accountClient.profile = newProfile;

    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

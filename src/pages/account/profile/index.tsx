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
import {
  withSessionSSR,
  Redirect,
  getMultipartReqBody,
} from "#server/requests";
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

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient, IAccountProfileInit } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import { Image } from "#components/images";

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
          <ArticleHeader>
            <Heading level={2}>{profile.full_name ?? "Anonymous"}</Heading>
            {profile.avatar_url && <Image src={"https://downloader.disk.yandex.ru/disk/7d95d501ac9e6c27a0a305ea7057bfee9aebe025bcfae89d4707e4d21679a272/628f9194/D-iq9lQjX_Zr993IEYjzkmycE3C0fjH29HfwRtDDKVyWBJtVQkKaAY6WQLsBCfaX_5jVH_I_j0M2ihrTxEBGRg%3D%3D?uid=0&filename=%D0%97%D0%B8%D0%BC%D0%B0.jpg&disposition=attachment&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=1394575&hid=db0ae88c49a4428517b857606969996b&media_type=image&tknv=v2&etag=a64146fee5e15b3b94c204e544426d43"} />}
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

    const isFormSubmission =
      req.method === "POST" &&
      req.headers["content-type"]?.includes("multipart/form-data");

    if (!isFormSubmission) {
      return {
        props: {
          ...localization,
          localeInfo,
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
          ...localization,
          localeInfo,
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
        ...localization,
        localeInfo,
        account: accountClient,
      },
    };
  }
);

export default AccountPage;

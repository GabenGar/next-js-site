import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import {
  getAccountDetails,
  sendEmailConfirmation,
  validateEmailString,
} from "#lib/account";
import { getReqBody, withSessionSSR, Redirect } from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { FormSectionEmail } from "#components/forms/sections";
import { ErrorsView } from "#components/errors";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface AccountEmailProps extends BasePageProps {
  account: IAccountClient;
  newEmail?: string;
  isSent?: boolean;
}

function AccountEmailPage({
  localeInfo,
  errors,
  account,
  newEmail,
  isSent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("email_title"),
    description: t("email_desc"),
    canonicalPath: "/account/email",
  });

  return (
    <Page seoTags={seoTags}>
      <Form method="POST">
        {account.email && (
          <FormSectionEmail
            id="email-current"
            name="current_email"
            isReadOnly
            defaultValue={account.email}
          >
            {t("current_email")}
          </FormSectionEmail>
        )}

        {isSent ? (
          <p>{t("confirmation_sent")}</p>
        ) : (
          <FormSectionEmail
            id="email-new"
            name="new_email"
            required
            defaultValue={newEmail}
          >
            {t("new_email")}
          </FormSectionEmail>
        )}

        {errors && <ErrorsView errors={errors} />}
      </Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AccountEmailProps>(
  async ({ req, locale, defaultLocale }) => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };
    const { account_id } = req.session;

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

    const { id, password, ...accountClient } = account;
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "account",
    ]);

    if (req.method === "POST") {
      const { new_email } = await getReqBody<{ new_email: string }>(req);

      const result = await validateEmailString(new_email);

      if (!result.isValid) {
        return {
          props: {
            ...localization,
            localeInfo,
            account: accountClient,
            schemaValidationErrors: result.schemaValidationErrors,
          },
        };
      }

      const confirmation = await sendEmailConfirmation(new_email, account_id);

      return {
        props: {
          ...localization,
          localeInfo,
          account: accountClient,
          isSent: true,
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

export default AccountEmailPage;

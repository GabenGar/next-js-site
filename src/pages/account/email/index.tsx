import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import {
  sendEmailConfirmation,
  validateEmailString,
  toAccountClient,
} from "#lib/account";
import {
  getReqBody,
  createProtectedProps,
} from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { FormSectionEmail } from "#components/forms/sections";
import { ErrorsView } from "#components/errors";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";

interface AccountEmailProps {
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

export const getServerSideProps = createProtectedProps<AccountEmailProps>(
  { extraLangNamespaces: ["account"] },
  async (context, { account }) => {
    const { req } = context;
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const accountClient = toAccountClient(account);

    if (req.method === "POST") {
      const { new_email } = await getReqBody<{ new_email: string }>(req);

      const result = await validateEmailString(new_email);

      if (!result.isValid) {
        return {
          props: {
            account: accountClient,
            schemaValidationErrors: result.schemaValidationErrors,
          },
        };
      }

      const confirmation = await sendEmailConfirmation(new_email, account.id);

      return {
        props: {
          account: accountClient,
          isSent: true,
        },
      };
    }

    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default AccountEmailPage;

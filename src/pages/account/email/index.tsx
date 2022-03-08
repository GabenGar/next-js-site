import Head from "next/head";
import { getReqBody } from "#lib/util";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { FormSectionEmail } from "#components/forms/sections";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import {
  sendEmailConfirmation,
  validateEmailString,
} from "src/lib/account/email";
import { ErrorsView } from "#components/errors";

interface AccountEmailProps extends BasePageProps {
  account: IAccountClient;
  newEmail?: string;
  isSent?: boolean;
}

function AccountEmailPage({
  errors,
  account,
  newEmail,
  isSent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page heading="Account Email">
      <Head>
        <title>Account Email</title>
        <meta name="description" content="Account Email" />
      </Head>
      <Form method="POST">
        {account.email && (
          <FormSectionEmail
            id="email-current"
            name="current_email"
            isReadOnly
            defaultValue={account.email}
          >
            Current Email
          </FormSectionEmail>
        )}

        {errors && <ErrorsView errors={errors} />}
        {isSent ? (
          <p>The confirmation link is sent to your email.</p>
        ) : (
          <FormSectionEmail
            id="email-new"
            name="new_email"
            required
            defaultValue={newEmail}
          >
            New Email
          </FormSectionEmail>
        )}
      </Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AccountEmailProps>(
  async ({ req }) => {
    const { account_id } = req.session;

    if (!account_id) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      req.session.destroy();
      return {
        notFound: true,
      };
    }

    const { id, password, ...accountClient } = account;

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

      const confirmation = await sendEmailConfirmation(new_email, account_id);

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

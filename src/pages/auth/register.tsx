import Head from "next/head";
import { useTranslation } from "next-i18next";
import { IS_INVITE_ONLY } from "#environment/derived"
import { AuthError } from "#types/errors";
import { getReqBody } from "#lib/util";
import {
  validateAccountInitFields,
  registerAccount,
  withSessionSSR,
} from "#lib/account";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { ErrorsView } from "#components/errors";
import {
  FormSectionPassword,
  FormSectionText,
} from "#components/forms/sections";
import { LinkInternal } from "#components/links";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountInit } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface RegisterPageProps extends BasePageProps {
  accCreds?: IAccountInit;
}

function RegisterPage({
  accCreds,
  errors,
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page heading="Registration">
      <Head>
        <title>Registration</title>
        <meta name="description" content="Register account" />
      </Head>
      <Form method="POST">
        <p>
          Already registered?{" "}
          <LinkInternal href="/auth/login">Log in</LinkInternal>
        </p>
        {IS_INVITE_ONLY && (<FormSectionText
          id="acc-invite"
          name="invite"
          required
          defaultValue={accCreds?.invite}
        >
          Invite code
        </FormSectionText>)}
        <FormSectionText
          id="acc-name"
          name="name"
          required
          defaultValue={accCreds?.name}
        >
          Name
        </FormSectionText>
        <FormSectionPassword
          id="acc-password"
          name="password"
          required
          defaultValue={accCreds?.password}
        >
          Password
        </FormSectionPassword>
        {errors ? (
          <ErrorsView errors={errors} />
        ) : (
          schemaValidationErrors && (
            <ErrorsView errors={schemaValidationErrors} />
          )
        )}
      </Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<RegisterPageProps>(
  async ({ req }) => {
    const { account_id } = req.session;

    if (account_id) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      };
    }

    if (req.method === "POST") {
      const accInit = await getReqBody<IAccountInit>(req);
      const result = await validateAccountInitFields(accInit);

      if (!result) {
        const errors = Array.isArray(validateAccountInitFields.errors)
          ? [...validateAccountInitFields.errors]
          : [];

        return {
          props: {
            schemaValidationErrors: errors,
            accInit,
          },
        };
      }

      if (IS_INVITE_ONLY) {
        if (!accInit.invite) {
          return {
            props: {
              errors: ["No invite key is provided."],
              accInit,
            }
          }
        }
      }

      const newAcc = await registerAccount(accInit);

      if (newAcc instanceof AuthError) {
        return {
          props: {
            errors: [newAcc.message],
            accInit,
          },
        };
      }

      req.session.account_id = newAcc.id;
      await req.session.save();

      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default RegisterPage;

import Head from "next/head";
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
      const result = validateAccountInitFields(accInit);

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

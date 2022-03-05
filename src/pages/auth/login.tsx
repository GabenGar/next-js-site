import Head from "next/head";
import { AuthError } from "#types/errors";
import { getReqBody } from "#lib/util";
import {
  loginAccount,
  validateAccountInitFields,
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

import type { BasePageProps } from "#types/pages";
import type { IAccountInit } from "#types/entities";
import type { InferGetServerSidePropsType } from "next";

interface LoginPageProps extends BasePageProps {
  accCreds?: IAccountInit;
}

export function LoginPage({
  errors,
  accCreds,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page heading="Login">
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in to your account." />
      </Head>
      <Form method="POST">
        <p>
          Not registered?{" "}
          <LinkInternal href="/auth/register">Register</LinkInternal>
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
          isNew={false}
          defaultValue={accCreds?.password}
        >
          Password
        </FormSectionPassword>
        {errors && <ErrorsView errors={errors} />}
      </Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<LoginPageProps>(
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
      const accCreds = await getReqBody<IAccountInit>(req);
      const isValid = validateAccountInitFields(accCreds);

      if (!isValid) {
        const errors = validateAccountInitFields.errors
          ? [...validateAccountInitFields.errors]
          : [];
          
        return {
          props: {
            schemaValidationErrors: errors,
            accCreds,
          },
        };
      }

      const result = await loginAccount(accCreds);

      if (result instanceof AuthError) {
        return {
          props: {
            errors: [result.message],
            accCreds,
          },
        };
      }

      req.session.account_id = result.id;
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

export default LoginPage;

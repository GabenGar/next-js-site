import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthError } from "#types/errors";
import { siteTitle } from "#lib/util";
import {
  loginAccount,
  validateAccountInitFields,
  withSessionSSR,
} from "#lib/account";
import { getReqBody } from "#server/requests";
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
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("auth");
  const title = t("login_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("login_desc")} />
      </Head>
      <Form method="POST" submitButton={t("log_in")}>
        <p>
          {t("not_registered")}?{" "}
          <LinkInternal href="/auth/register">{t("register")}</LinkInternal>
        </p>
        <FormSectionText
          id="acc-name"
          name="name"
          required
          defaultValue={accCreds?.name}
        >
          {t("acc_name")}
        </FormSectionText>
        <FormSectionPassword
          id="acc-password"
          name="password"
          required
          isNew={false}
          defaultValue={accCreds?.password}
        >
          {t("acc_password")}
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

export const getServerSideProps = withSessionSSR<LoginPageProps>(
  async ({ req, locale }) => {
    const { account_id } = req.session;

    if (account_id) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      };
    }

    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "auth",
    ]);

    if (req.method === "POST") {
      const accCreds = await getReqBody<IAccountInit>(req);
      const isValid = validateAccountInitFields(accCreds);

      if (!isValid) {
        return {
          props: {
            ...localization,
            schemaValidationErrors: [...validateAccountInitFields.errors!],
            accCreds,
          },
        };
      }

      const result = await loginAccount(accCreds);

      if (result instanceof AuthError) {
        return {
          props: {
            ...localization,
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
      props: {
        ...localization,
      },
    };
  }
);

export default LoginPage;

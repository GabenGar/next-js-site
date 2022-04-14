import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IS_INVITE_ONLY } from "#environment/derived";
import { AuthError } from "#lib/errors";
import { getReqBody, siteTitle } from "#lib/util";
import { validateAccountInitFields, registerAccount } from "#lib/account";
import { withSessionSSR } from "#server/requests";
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
  const { t } = useTranslation("auth");
  const title = t("reg_title");
  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("reg_desc")} />
      </Head>
      <Form method="POST" submitButton={t("register")}>
        <p>
          {t("already_registered")}?{" "}
          <LinkInternal href="/auth/login">{t("log_in")}</LinkInternal>
        </p>
        {IS_INVITE_ONLY && (
          <FormSectionText
            id="acc-invite"
            name="invite"
            required
            defaultValue={accCreds?.invite}
          >
            {t("invite_code")}
          </FormSectionText>
        )}
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

export const getServerSideProps = withSessionSSR<RegisterPageProps>(
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
      const accInit = await getReqBody<IAccountInit>(req);
      const validationResult = await validateAccountInitFields(accInit);

      if (!validationResult.is_successful) {
        return {
          props: {
            schemaValidationErrors: [...validationResult.errors],
            accInit,
          },
        };
      }

      if (IS_INVITE_ONLY) {
        if (!accInit.invite) {
          return {
            props: {
              ...localization,
              errors: ["No invite key is provided."],
              accInit,
            },
          };
        }
      }

      const newAcc = await registerAccount(accInit);

      if (newAcc instanceof AuthError) {
        return {
          props: {
            ...localization,
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
      props: {
        ...localization,
      },
    };
  }
);

export default RegisterPage;

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND, SEE_OTHER } from "#environment/constants/http";
import { AuthError } from "#lib/errors";
import { createSEOTags } from "#lib/seo";
import { loginAccount, validateAccountInitFields } from "#lib/account";
import { withSessionSSR, getReqBody } from "#server/requests";
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
  const router = useRouter();
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("login_title"),
    description: t("login_desc"),
    urlPath: router.pathname,
  });

  return (
    <Page seoTags={seoTags}>
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
          statusCode: FOUND,
          destination: "/account",
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
      const validationResult = await validateAccountInitFields(accCreds);

      if (!validationResult.is_successful) {
        return {
          props: {
            ...localization,
            schemaValidationErrors: [...validationResult.errors],
            accCreds,
          },
        };
      }

      const loginResult = await loginAccount(accCreds);

      if (loginResult instanceof AuthError) {
        return {
          props: {
            ...localization,
            errors: [loginResult.message],
            accCreds,
          },
        };
      }

      req.session.account_id = loginResult.id;
      await req.session.save();

      return {
        redirect: {
          statusCode: SEE_OTHER,
          destination: "/auth/success",
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

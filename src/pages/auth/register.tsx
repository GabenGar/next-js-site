import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { IS_INVITE_ONLY } from "#environment/derived";
import { AuthError } from "#lib/errors";
import { createSEOTags } from "#lib/seo";
import { validateAccountInitFields, registerAccount } from "#lib/account";
import { createNextURL } from "#lib/language";
import { withSessionSSR, getReqBody } from "#server/requests";
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
  localeInfo,
  accCreds,
  errors,
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("reg_title"),
    description: t("reg_desc"),
    canonicalPath: "/auth/register",
  });

  return (
    <Page seoTags={seoTags}>
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
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (account_id) {
      const redirectURL = createNextURL(localeInfo, "/account").toString();

      return {
        redirect: {
          statusCode: FOUND,
          destination: redirectURL,
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
            ...localization,
            localeInfo,
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
              localeInfo,
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
            localeInfo,
            errors: [newAcc.message],
            accInit,
          },
        };
      }

      req.session.account_id = newAcc.id;
      await req.session.save();

      const redirectURL = createNextURL(localeInfo, "/auth/success").toString();

      return {
        redirect: {
          statusCode: FOUND,
          destination: redirectURL,
          permanent: false,
        },
      };
    }

    return {
      props: {
        ...localization,
        localeInfo,
      },
    };
  }
);

export default RegisterPage;

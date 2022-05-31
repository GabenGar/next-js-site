import { useTranslation } from "next-i18next";
import { FOUND } from "#environment/constants/http";
import { IS_INVITE_ONLY } from "#environment/derived";
import { createSEOTags } from "#lib/seo";
import { validateAccountInitFields, registerAccount } from "#lib/account";
import {
  withSessionSSR,
  getReqBody,
  Redirect,
  createServerSideProps,
} from "#server/requests";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { ErrorsView } from "#components/errors";
import { FormSectionPassword, Text } from "#components/forms/sections";
import { LinkInternal } from "#components/links";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountInit } from "#types/entities";

interface IProps {
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
          <Text
            id="acc-invite"
            name="invite"
            required
            defaultValue={accCreds?.invite}
          >
            {t("invite_code")}
          </Text>
        )}
        <Text id="acc-name" name="name" required defaultValue={accCreds?.name}>
          {t("acc_name")}
        </Text>
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

export const getServerSideProps = createServerSideProps<IProps>(
  { extraLangNamespaces: ["auth"] },
  // @ts-expect-error session typing error
  withSessionSSR<IProps>(async (context) => {
    const { req } = context;
    const { account_id } = req.session;

    if (account_id) {
      return Redirect.fromContext(context, "/account", FOUND);
    }

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
              errors: ["No invite key is provided."],
              accInit,
            },
          };
        }
      }

      const newAcc = await registerAccount(accInit);

      req.session.account_id = newAcc.id;
      await req.session.save();

      return Redirect.fromContext(context, "/auth/success", FOUND);
    }

    return {
      props: {

      },
    };
  })
);

export default RegisterPage;

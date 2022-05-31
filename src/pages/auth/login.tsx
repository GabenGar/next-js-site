import { useTranslation } from "next-i18next";
import { FOUND, SEE_OTHER } from "#environment/constants/http";
import { AuthError } from "#lib/errors";
import { createSEOTags } from "#lib/seo";
import { loginAccount, validateAccountInitFields } from "#lib/account";
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

import type { IAccountInit } from "#types/entities";
import type { InferGetServerSidePropsType } from "next";

interface IProps {
  accCreds?: IAccountInit;
}

export function LoginPage({
  localeInfo,
  errors,
  accCreds,
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("login_title"),
    description: t("login_desc"),
    canonicalPath: "/auth/login",
  });

  return (
    <Page seoTags={seoTags}>
      <Form method="POST" submitButton={t("log_in")}>
        <p>
          {t("not_registered")}?{" "}
          <LinkInternal href="/auth/register">{t("register")}</LinkInternal>
        </p>
        <Text id="acc-name" name="name" required defaultValue={accCreds?.name}>
          {t("acc_name")}
        </Text>
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

export const getServerSideProps = createServerSideProps<IProps>(
  { extraLangNamespaces: ["auth"] },
  // @ts-expect-error session typing
  withSessionSSR<IProps>(async (context) => {
    const { req } = context;
    const { account_id } = req.session;

    if (account_id) {
      return Redirect.fromContext(context, "/account", FOUND);
    }

    if (req.method === "POST") {
      const accCreds = await getReqBody<IAccountInit>(req);
      const validationResult = await validateAccountInitFields(accCreds);

      if (!validationResult.is_successful) {
        return {
          props: {
            schemaValidationErrors: [...validationResult.errors],
            accCreds,
          },
        };
      }

      const loginResult = await loginAccount(accCreds);

      if (loginResult instanceof AuthError) {
        return {
          props: {
            errors: [loginResult.message],
            accCreds,
          },
        };
      }

      req.session.account_id = loginResult.id;
      await req.session.save();

      return Redirect.fromContext(context, "/auth/success", SEE_OTHER);
    }

    return {
      props: {},
    };
  })
);

export default LoginPage;

import { useTranslation } from "next-i18next";
import { FOUND, SEE_OTHER } from "#environment/constants/http";
import {
  withSessionSSR,
  Redirect,
  createServerSideProps,
} from "#server/requests";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { Form } from "#components/forms";

import type { InferGetServerSidePropsType } from "next";

interface LogoutPageProps {}

export function LogoutPage({
  localeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("logout_title"),
    description: t("logout_desc"),
    canonicalPath: "/auth/logout",
  });

  return (
    <Page seoTags={seoTags}>
      <Form method="POST" submitButton={t("log_out")} />
    </Page>
  );
}

export const getServerSideProps = createServerSideProps<LogoutPageProps>(
  { extraLangNamespaces: ["auth"] },
  withSessionSSR(async (context) => {
    const { req } = context;
    const { account_id } = req.session;

    if (!account_id) {
      return Redirect.fromContext(context, "/auth/login", FOUND);
    }

    if (req.method === "POST") {
      req.session.destroy();

      return Redirect.fromContext(context, "/", SEE_OTHER);
    }

    return {
      props: {},
    };
  })
);

export default LogoutPage;

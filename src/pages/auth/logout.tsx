import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withSessionSSR } from "#server/requests";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { Form } from "#components/forms";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import { FOUND, SEE_OTHER } from "#environment/constants/http";

interface LogoutPageProps extends BasePageProps {}

export function LogoutPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { t } = useTranslation("auth");
  const title = t("logout_title");
  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("logout_desc")} />
      </Head>
      <Form method="POST" submitButton={t("log_out")} />
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<LogoutPageProps>(
  async ({ req, locale }) => {
    const { account_id } = req.session;

    if (!account_id) {
      return {
        redirect: {
          destination: "/auth/login",
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
      req.session.destroy();

      return {
        redirect: {
          statusCode: SEE_OTHER, 
          destination: "/",
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

export default LogoutPage;

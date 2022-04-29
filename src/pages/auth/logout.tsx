import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND, SEE_OTHER } from "#environment/constants/http";
import { withSessionSSR } from "#server/requests";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { Page } from "#components/pages";
import { Form } from "#components/forms";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface LogoutPageProps extends BasePageProps {}

export function LogoutPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("logout_title"),
    description: t("logout_desc"),
    urlPath: router.pathname,
  });

  return (
    <Page seoTags={seoTags}>
      <Form method="POST" submitButton={t("log_out")} />
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<LogoutPageProps>(
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;

    if (!account_id) {
      const redirectURL = createNextURL(
        { context: { locale, defaultLocale } },
        "/auth/login"
      ).toString();

      return {
        redirect: {
          statusCode: FOUND,
          destination: redirectURL,
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

      const redirectURL = createNextURL(
        { context: { locale, defaultLocale } },
        "/"
      ).toString();

      return {
        redirect: {
          statusCode: SEE_OTHER,
          destination: redirectURL,
        },
      };
    }

    return {
      props: {
        ...localization,
        localeInfo: {
          locale: locale!,
          defaultLocale: defaultLocale!,
        },
      },
    };
  }
);

export default LogoutPage;

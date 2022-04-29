import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { setLocalStoreItem } from "#store/local";
import { Page } from "#components/pages";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import type { BasePageProps } from "#types/pages";

interface RegisterPageProps extends BasePageProps {}

function AuthSuccessPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("auth_success_title"),
    description: t("auth_success_desc"),
    urlPath: router.pathname,
  });
  const redirectURL = createNextURL({ localeInfo }, "/account").toString();
  console.log(redirectURL);

  useEffect(() => {
    setLocalStoreItem<boolean>("is_registered", true);
  }, []);

  return (
    <Page
      seoTags={{
        ...seoTags,
        additionalMetaTags: [
          {
            httpEquiv: "refresh",
            content: `5; url=${redirectURL}`,
          },
        ],
      }}
    >
      <p>{t("auth_success_message")}</p>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<RegisterPageProps> = async ({
  locale,
  defaultLocale,
}) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "auth",
  ]);

  return {
    props: {
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
    },
  };
};

export default AuthSuccessPage;

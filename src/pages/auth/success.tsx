import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { ProjectURL } from "#lib/url";
import { setLocalStoreItem } from "#store/local";
import { Page } from "#components/pages";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import type { BasePageProps } from "#types/pages";

interface RegisterPageProps extends BasePageProps {}

function AuthSuccessPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("auth");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("auth_success_title"),
    description: t("auth_success_desc"),
    canonicalPath: "/auth/success",
  });
  const redirectURL = new ProjectURL(localeInfo, "/account").toString();

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

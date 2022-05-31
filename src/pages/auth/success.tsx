import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { ProjectURL } from "#lib/url";
import { createStaticProps } from "#server/requests";
import { setLocalStoreItem } from "#browser/store/local";
import { Page } from "#components/pages";

import type { InferGetStaticPropsType } from "next";

interface RegisterPageProps {}

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

export const getStaticProps = createStaticProps<RegisterPageProps>({
  extraLangNamespaces: ["auth"],
});

export default AuthSuccessPage;

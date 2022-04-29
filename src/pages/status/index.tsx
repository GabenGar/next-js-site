import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { InternalNav } from "#components/navigation";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface ITemplatePageProps extends BasePageProps {}

interface ITemplatePageParams extends ParsedUrlQuery {}

function StatusPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("status_title"),
    description: t("status_desc"),
    canonicalPath: "/status",
  });

  return (
    <Page seoTags={seoTags}>
      <InternalNav
        navLists={[
          {
            navItems: [
              {
                title: t("status_translation"),
                link: "/status/translation",
                iconID: "language",
              },
            ],
          },
        ]}
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<
  ITemplatePageProps,
  ITemplatePageParams
> = async ({ locale, defaultLocale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
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

export default StatusPage;

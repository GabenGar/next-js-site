import { useRouter } from "next/router";
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

function StatusPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("status_title"),
    description: t("status_desc"),
    urlPath: router.pathname,
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
> = async ({ locale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default StatusPage;

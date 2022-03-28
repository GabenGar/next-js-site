import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { InternalNav } from "#components/navigation";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface ITemplatePageProps extends BasePageProps {}

interface ITemplatePageParams extends ParsedUrlQuery {}

function StatusPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const title = t("status_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("status_desc")} />
      </Head>
      <InternalNav
        navLists={[
          {
            navItems: [
              {
                title: "Translation",
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

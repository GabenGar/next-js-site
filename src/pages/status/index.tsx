import { useTranslation } from "next-i18next";
import { createStaticProps } from "#server/requests";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { InternalNav } from "#components/navigation";

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

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

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["common"],
});

export default StatusPage;

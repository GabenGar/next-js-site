import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { CardList } from "#components/lists/card-list";
import { ChallengeCard } from "#components/frontend-mentor";
import challenges from "./challenges.json";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Challenge } from "#types/frontend-mentor";
import type { BasePageProps } from "#types/pages";
import { createNextURL } from "#lib/language";

interface FMHomePageProps extends BasePageProps {}

interface FMHomePageParams extends ParsedUrlQuery {}

function FMHomePage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: t("index_title"),
    description: t("index_desc"),
    canonicalPath: createNextURL(localeInfo, "frontend-mentor").toString(),
  });

  return (
    <Page seoTags={seoTags}>
      <CardList>
        {challenges.map((challenge: Challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </CardList>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<
  FMHomePageProps,
  FMHomePageParams
> = async ({ locale, defaultLocale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
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

export default FMHomePage;

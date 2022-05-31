import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests";
import { Page } from "#components/pages";
import { CardList } from "#components/lists/card-list";
import { ChallengeCard } from "#components/frontend-mentor";
import challenges from "./challenges.json";

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Challenge } from "#types/frontend-mentor";

interface FMHomePageProps {}

interface FMHomePageParams extends ParsedUrlQuery {}

function FMHomePage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("index_title"),
    description: t("index_desc"),
    canonicalPath: "frontend-mentor",
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

export const getStaticProps = createStaticProps<
  FMHomePageProps,
  FMHomePageParams
>({ extraLangNamespaces: ["frontend-mentor"] });

export default FMHomePage;

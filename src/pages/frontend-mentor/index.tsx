import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardList } from "#components/lists/card-list";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { ChallengeCard } from "#components/frontend-mentor";
import challenges from "./challenges.json";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Challenge } from "#types/frontend-mentor";
import type { BasePageProps } from "#types/pages";

interface FMHomePageProps extends BasePageProps {}

interface FMHomePageParams extends ParsedUrlQuery {}

function FMHomePage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("frontend-mentor")
  const title = t("index_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("index_desc")} />
      </Head>
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
> = async ({ locale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default FMHomePage;

import Head from "next/head";
import { CardList } from "#components/lists/card-list";
import { Page } from "#components/pages";
import { ChallengeCard } from "#components/frontend-mentor";
import challenges from "./challenges.json";

import type { Challenge } from "#types/frontend-mentor";

function FMHome() {
  return (
    <Page heading="Frontend Mentor Challenges">
      <Head>
        <title>Frontend Mentor Challenges</title>
        <meta name="description" content="Frontend Mentor Challenges" />
      </Head>
      <CardList>
        {challenges.map((challenge: Challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </CardList>
    </Page>
  );
}

export default FMHome;

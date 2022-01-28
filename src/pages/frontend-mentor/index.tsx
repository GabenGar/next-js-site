import Head from "next/head";

import { CardList } from "#components/lists/card-list";
import { Section } from "#components/pages";
import { ChallengeCard } from "#components/frontend-mentor";
import challenges from "./challenges.json";

import type { NextPage } from "next";
import type { Challenge } from "#types/frontend-mentor";

const FMHome: NextPage = () => {

  return (<Section heading="Frontend Mentor Challenges">
    <Head>
      <title>Frontend Mentor Challenges</title>
      <meta name="description" content="Frontend Mentor Challenges" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <CardList>
      {challenges.map((challenge: Challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge}/>
      ))}
    </CardList>
  </Section>);
};

export default FMHome;

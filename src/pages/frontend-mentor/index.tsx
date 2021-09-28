import Head from "next/head";

import { CardList } from "#components";
import { Section } from "#components/page";
import { ChallengeCard } from "#components/frontend-mentor";

import type { NextPage } from "next";

const FMHome: NextPage = () => {
  
  return (<Section heading="Frontend Mentor Challenges">
    <Head>
      <title>Frontend Mentor Challenges</title>
      <meta name="description" content="Frontend Mentor Challenges" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <CardList>
      <ChallengeCard></ChallengeCard>
    </CardList>
  </Section>);
};

export default FMHome;

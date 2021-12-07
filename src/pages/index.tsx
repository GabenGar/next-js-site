import Head from "next/head";

import { InternalAnchour } from "#components/fancy";
import { Section } from "#components/page";

import type { NextPage } from "next";

const Home: NextPage = () => {

  return (<Section heading="Next.JS site">
    <Head>
      <title>Next.JS site</title>
      <meta name="description" content="The site made with Next.JS" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav>
      <ul>
        <li>
          <InternalAnchour href="/">
            Home
          </InternalAnchour>
        </li>
        <li>
          <InternalAnchour href="/frontend-mentor">
            Frontend Mentor Challenges
          </InternalAnchour>
        </li>
      </ul>
    </nav>
  </Section>);
};

export default Home;

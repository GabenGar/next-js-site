import Head from "next/head";

import { LocalAnchour } from "#components/fancy";
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
          <LocalAnchour href="/">
            Home
          </LocalAnchour>
        </li>
        <li>
          <LocalAnchour href="/frontend-mentor">
            Frontend Mentor Challenges
          </LocalAnchour>
        </li>
      </ul>
    </nav>
  </Section>);
};

export default Home;

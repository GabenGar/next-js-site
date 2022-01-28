import Head from "next/head";

import { siteTitle } from "#lib/util";
import { LinkInternal } from "#components/links";
import { Section } from "#components/pages";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const pageTitle = "Gabengar's site";

  return (
    <Section heading={pageTitle}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta
          name="description"
          content="This is the site of mine made with nextjs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <ul>
          <li>
            <LinkInternal href="/">Home</LinkInternal>
          </li>
          <li>
            <LinkInternal href="/frontend-mentor">
              Frontend Mentor Challenges
            </LinkInternal>
          </li>
        </ul>
      </nav>
    </Section>
  );
};

export default Home;

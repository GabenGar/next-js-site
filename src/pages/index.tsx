import Head from "next/head";

import { InternalAnchour } from "#components/fancy";
import { Section } from "#components/page";

import type { NextPage } from "next";
import { siteTitle } from "#lib/util";

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
            <InternalAnchour href="/">Home</InternalAnchour>
          </li>
          <li>
            <InternalAnchour href="/frontend-mentor">
              Frontend Mentor Challenges
            </InternalAnchour>
          </li>
        </ul>
      </nav>
    </Section>
  );
};

export default Home;

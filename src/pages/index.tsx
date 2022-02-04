import Head from "next/head";

import { siteTitle } from "#lib/util";
import { LinkInternal } from "#components/links";
import { FELogo } from "#components/icons/logos";
import { Page } from "#components/pages";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const pageTitle = "Welcome to my site!";

  return (
    <Page heading={pageTitle}>
      <Head>
        <title>{siteTitle("Welcome page")}</title>
        <meta
          name="description"
          content="This is the site of mine made with nextjs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul>
          <li>
            <LinkInternal href="/frontend-mentor">
              <FELogo />
              Frontend Mentor Challenges
            </LinkInternal>
          </li>
        </ul>
      </nav>
    </Page>
  );
};

export default Home;

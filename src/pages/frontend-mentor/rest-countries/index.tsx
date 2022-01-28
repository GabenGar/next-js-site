import Head from "next/head";
import { Section, RESTCountries as Layout } from "#components/pages";
import { LinkInternal } from "#components/links";
import styles from "./index.module.scss";

import type { NextPage } from "next";

export default function RESTCountriesPage() {
  return (
    <Section heading="REST Countries">
      <Head>
        <title>REST Countries</title>
        <meta
          name="description"
          content="REST Countries Frontend Mentor Challenge"
        />
      </Head>
      <nav>
        <ul>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/all",
              }}
            >
              All Countries
            </LinkInternal>
          </li>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/regions",
              }}
            >
              Regions
            </LinkInternal>
          </li>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/subregions",
              }}
            >
              Subregions
            </LinkInternal>
          </li>
        </ul>
      </nav>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

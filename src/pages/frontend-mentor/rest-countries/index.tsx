import Head from "next/head";
import { Section, RESTCountries as Layout } from "#components/page";
import { InternalAnchour } from "#components/fancy";
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
            <InternalAnchour
              href={{
                pathname: "/frontend-mentor/rest-countries/all",
              }}
            >
              All Countries
            </InternalAnchour>
          </li>
          <li>
            <InternalAnchour
              href={{
                pathname: "/frontend-mentor/rest-countries/regions",
              }}
            >
              Regions
            </InternalAnchour>
          </li>
          <li>
            <InternalAnchour
              href={{
                pathname: "/frontend-mentor/rest-countries/subregions",
              }}
            >
              Subregions
            </InternalAnchour>
          </li>
        </ul>
      </nav>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

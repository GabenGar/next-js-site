import Head from "next/head";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";
import styles from "./index.module.scss";

import type { NextPage } from "next";

export default function RESTCountriesPage() {
  return (
    <Page heading="REST Countries">
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
    </Page>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

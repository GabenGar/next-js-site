import Head from "next/head";
import { Section, RESTCountries as Layout } from "#components/page";
import { LocalAnchour } from "#components/fancy";
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
            <LocalAnchour
              href={{
                pathname: "/frontend-mentor/rest-countries/all",
              }}
            >
              All Countries
            </LocalAnchour>
          </li>
        </ul>
      </nav>
      <p>TODO list:</p>
      <ul>
        <li>Toggle the color scheme between light and dark mode (optional)</li>
      </ul>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

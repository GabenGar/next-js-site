import Head from "next/head";
import useSWR from "swr";
import { restCountries as fetcher } from "#api/rest-countries";
import { CardList } from "#components";
import { Section } from "#components/page";
import { RESTCountries as Layout } from "#components/page";
import { LocalAnchour } from "#components/fancy";
import { CountryCard } from "#components/frontend-mentor";
import styles from "./index.module.scss";

import type { NextPage } from "next";
import type { API } from "#types/frontend-mentor/rest-countries";

export default function RESTCountriesPage() {
  const { data, error } = useSWR<API.Country[]>(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <Section heading="All Countries">
      <Head>
        <title>All Countries</title>
        <meta name="description" content="All Countries" />
      </Head>
      <CardList>
        {data.slice(0, 1).map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </CardList>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

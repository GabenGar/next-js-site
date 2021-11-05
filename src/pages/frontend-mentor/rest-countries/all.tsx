import Head from "next/head";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { restCountries as fetcher } from "#api/rest-countries";
import { CardList, Pagination } from "#components";
import { Section } from "#components/page";
import { RESTCountries as Layout } from "#components/page";
import { CountryCard } from "#components/frontend-mentor";
import styles from "./index.module.scss";

import type { NextPage } from "next";
import type { API } from "#types/frontend-mentor/rest-countries";

const limit = 25;

export default function RESTCountriesPage() {
  const { data, error } = useSWR<API.Country[]>(
    "https://restcountries.com/v3.1/all",
    fetcher
  );
  const [currentPage, changeCurrentPage] = useState(1);
  const [currentCountries, changeCurrentCountries] = useState<API.Country[]>(
    []
  );

  useEffect(() => {
    if (data?.length) {
      const currentRange = [(currentPage - 1) * limit, currentPage * limit]
      const countries = data.slice(...currentRange);
      changeCurrentCountries(() => countries)
    }
  }, [data, currentPage]);

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
      <Pagination currentPage={currentPage} totalCount={data.length} />
      <CardList>
        {currentCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </CardList>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

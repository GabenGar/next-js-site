import Head from "next/head";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { restCountries as fetcher } from "#api/rest-countries";
import { CardList, Pagination } from "#components";
import { Section } from "#components/page";
import { RESTCountries as Layout } from "#components/page";
import { CountryCard } from "#components/frontend-mentor";
import styles from "./index.module.scss";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { API } from "#types/frontend-mentor/rest-countries";

interface Props {
  countries: API.Country[];
}

const limit = 25;
export default function RESTCountriesPage({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentPage, changeCurrentPage] = useState(1);
  const [currentCountries, changeCurrentCountries] = useState<API.Country[]>(
    []
  );

  useEffect(() => {
    const currentRange = [(currentPage - 1) * limit, currentPage * limit];
    const slicedCountries = countries.slice(...currentRange);
    changeCurrentCountries(() => slicedCountries);
  }, [countries, currentPage]);

  // if (error) {
  //   return (
  //     <div>
  //       <p>Failed to Load</p>
  //       <p>Error message:</p>
  //       <pre>{JSON.stringify(error, null, 2)}</pre>
  //     </div>
  //   );
  // }
  if (!countries) {
    return <div>loading...</div>;
  }

  return (
    <Section heading="All Countries">
      <Head>
        <title>All Countries</title>
        <meta name="description" content="All Countries" />
      </Head>
      <Pagination
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage}
        totalCount={countries.length}
      />
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

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: API.Country[] = await response.json();

  if (!countries) {
    return {
      notFound: true,
    };
  }

  return {
    props: { countries },
  };
};

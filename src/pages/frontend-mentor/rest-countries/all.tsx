import Head from "next/head";
import { useEffect, useState } from "react";
import { CardList, Pagination } from "#components";
import { Form, SubmitSection, TextSection } from "#components/fancy/form";
import { Section, RESTCountries as Layout } from "#components/page";
import { CountryCard } from "#components/frontend-mentor";
import styles from "./all.module.scss";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { FormEvent } from "react";
import type { API } from "#types/frontend-mentor/rest-countries";

interface Props {
  countries: API.Country[];
}

const limit = 25;

export default function RESTCountriesPage({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentPage, changeCurrentPage] = useState(1);
  const [filteredCountries, filterCountries] = useState(countries);
  const [currentCountries, changeCurrentCountries] = useState<API.Country[]>(
    []
  );
  const regions = Array.from(
    countries.reduce(
      (prev, current) => prev.add(current.region),
      new Set<string>()
    )
  );

  useEffect(() => {
    const currentRange = [(currentPage - 1) * limit, currentPage * limit];
    const slicedCountries = filteredCountries.slice(...currentRange);
    changeCurrentCountries(() => slicedCountries);
  }, [filteredCountries, currentPage]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = ( // @ts-expect-error `elements` can be accessed by `name`
      form.elements["country-name"] as HTMLInputElement
    ).value.toLowerCase();
    const filteredByName = countries.filter((country) =>
      country.name.common.toLowerCase().includes(name)
    );
    filterCountries(() => filteredByName);
    changeCurrentPage(() => 1);
  }

  if (!countries) {
    return <div>Loading...</div>;
  }

  return (
    <Section heading="All Countries">
      <Head>
        <title>All Countries</title>
        <meta name="description" content="All Countries" />
      </Head>
      <ul>
        <li>Filter countries by region</li>
      </ul>

      <Form className={styles.search} onSubmit={handleSearch}>
        <TextSection id="country-search" name="country-name">
          Name:
        </TextSection>
        <SubmitSection>Search</SubmitSection>
      </Form>

      <Pagination
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage}
        totalCount={filteredCountries.length}
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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

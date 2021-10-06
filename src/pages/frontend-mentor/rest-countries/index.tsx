import Head from "next/head";
import useSWR from 'swr';
import { fetcher } from "#lib/util";
import { Section } from "#components/page";
import { RESTCountries as Layout } from "#components/page"
import styles from "./index.module.scss";

import type { NextPage } from "next";
import type { API } from "#types/frontend-mentor/rest-countries";

export default function RESTCountriesPage() {
  const { data, error } = useSWR<API.Country>("https://restcountries.com/v3.1/all", fetcher);


  if (error) {return <div>failed to load</div>}
  if (!data) {return <div>loading...</div>}
  console.log(data);

  return (<Section heading="REST Countries">
    <Head>
      <title>REST Countries</title>
      <meta name="description" content="REST Countries Frontend Mentor Challenge" />
    </Head>
    <p>
      TODO list:
    </p>
    <ul>
      <li>See all countries from the API on the homepage</li>
      <li>Search for a country using an input field</li>
      <li>Filter countries by region</li>
      <li>Click on a country to see more detailed information on a separate page</li>
      <li>Click through to the border countries on the detail page</li>
      <li>Toggle the color scheme between light and dark mode (optional)</li>
    </ul>
  </Section>);
};

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

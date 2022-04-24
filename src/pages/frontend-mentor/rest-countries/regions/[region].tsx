import Head from "next/head";

import { siteTitle } from "#lib/util";
import { countriesByRegion } from "#lib/api/rest-countries";
import { CardList } from "#components/lists";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#lib/api/rest-countries";

interface Props {
  region: string;
  countries: Country[];
}

interface Params extends ParsedUrlQuery {
  region: string;
}

function RegionDetails({
  region,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pageTitle = `${countries.length} countries of ${region}`;

  return (
    <Page heading={pageTitle}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta name="description" content={pageTitle} />
      </Head>
      <CardList>
        {countries.map((country) => (
          <CountryCard key={country.cca2} country={country} />
        ))}
      </CardList>
    </Page>
  );
}

RegionDetails.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { region } = context.params!;
  const countries = await countriesByRegion(region);

  if (!countries) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      region,
      countries,
    },
  };
};

export default RegionDetails;

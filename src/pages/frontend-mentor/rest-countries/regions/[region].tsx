import Head from "next/head";

import { siteTitle } from "#lib/util";
import { countriesByRegion } from "#api/rest-countries";
import { CardList } from "#components";
import { Section, RESTCountries as Layout } from "#components/page";
import { CountryCard } from "#components/frontend-mentor";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#api/rest-countries";

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
    <Section heading={pageTitle}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta name="description" content={pageTitle} />
      </Head>
      <CardList>
        {countries.map((country) => (
          <CountryCard key={country.cca2} country={country} />
        ))}
      </CardList>
    </Section>
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

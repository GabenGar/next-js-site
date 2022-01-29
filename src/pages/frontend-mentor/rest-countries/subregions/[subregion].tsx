import Head from "next/head";

import { siteTitle } from "#lib/util";
import { countriesByRegion as countriesBySubRegion } from "#lib/api/rest-countries";
import { CardList } from "#components/lists/card-list";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Section } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#lib/api/rest-countries";

interface Props {
  subregion: string;
  countries: Country[];
}

interface Params extends ParsedUrlQuery {
  subregion: string;
}

function SubRegionDetails({
  subregion,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pageTitle = `${countries.length} countries of ${subregion}`;

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

SubRegionDetails.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { subregion: region } = context.params!;
  const countries = await countriesBySubRegion(region);

  if (!countries) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      subregion: region,
      countries,
    },
  };
};

export default SubRegionDetails;

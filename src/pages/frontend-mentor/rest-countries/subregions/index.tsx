import Head from "next/head";
import { Fragment } from "react";
import { siteTitle } from "#lib/util";
import { allCountries } from "#lib/api/rest-countries";
import { GalleryList } from "#components/lists";
import { LocalNav } from "#components/fancy";
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
  subregions: {
    [subregion: string]: Country[];
  };
}

interface Params extends ParsedUrlQuery {}

function RegionCountries({
  subregions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const subRegionList = Object.keys(subregions).map((subregion) => {
    return {
      title: subregion,
      id: subregion.trim().toLowerCase(),
    };
  });
  const pageTitle = "Countries by Subregions";

  return (
    <Page heading={pageTitle}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta name="description" content={pageTitle} />
      </Head>
      <LocalNav items={subRegionList}>Subregions</LocalNav>
      {Object.entries(subregions).map(([subregion, countries]) => (
        <Fragment key={subregion.trim().toLowerCase()}>
          <h2 id={subregion.trim().toLowerCase()}>
            {subregion} (<span>{countries.length}</span> countries)
          </h2>
          <GalleryList>
            {countries.map((country) => (
              <CountryCard key={country.cca2} country={country} />
            ))}
          </GalleryList>
        </Fragment>
      ))}
    </Page>
  );
}

RegionCountries.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const countries = await allCountries();

  if (!countries) {
    return {
      notFound: true,
    };
  }

  const subregions = sortCountriesBySubRegions(countries);

  return {
    props: {
      subregions,
    },
  };
};

function sortCountriesBySubRegions(countries: Country[]) {
  const subregions: Record<string, Country[]> = {};
  countries
    .reduce((subregions, country) => {
      if (!subregions.has(country.subregion)) {
        subregions.set(country.subregion, [country]);
      } else {
        subregions.get(country.subregion)!.push(country);
      }

      return subregions;
    }, new Map<string, Country[]>())
    .forEach((countryList, subregion) => {
      subregions[subregion] = countryList;
    });

  return subregions;
}

export default RegionCountries;

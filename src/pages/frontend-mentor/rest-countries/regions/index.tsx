import Head from "next/head";
import { Fragment } from "react";

import { siteTitle } from "#lib/util";
import { allCountries } from "#api/rest-countries";
import { GalleryList } from "#components/lists";
import { LocalNav } from "#components/fancy";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Section } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#api/rest-countries";

interface Props {
  regions: {
    [region: string]: Country[];
  };
}

interface Params extends ParsedUrlQuery {}

function RegionCountries({
  regions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const regionList = Object.keys(regions).map((region) => {
    return {
      title: region,
      id: region.trim().toLowerCase(),
    };
  });

  return (
    <Section heading="Countries by Regions">
      <Head>
        <title>{siteTitle("Countries by Regions")}</title>
        <meta name="description" content="Countries by Regions" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <LocalNav items={regionList}>
        Regions
      </LocalNav>
      {Object.entries(regions).map(([region, countries]) => (
        <Fragment key={region.trim().toLowerCase()}>
          <h2 id={region.trim().toLowerCase()}>
            {region} (<span>{countries.length}</span> countries)
          </h2>
          <GalleryList>
            {countries.map((country) => (
              <CountryCard key={country.cca2} country={country} />
            ))}
          </GalleryList>
        </Fragment>
      ))}
    </Section>
  );
}

RegionCountries.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const countries = await allCountries();
  const regions = sortCountriesByRegions(countries);

  if (!countries) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      regions,
    },
  };
};

function sortCountriesByRegions(countries: Country[]) {
  const regions: Record<string, Country[]> = {};
  countries
    .reduce((regions, country) => {
      if (!regions.has(country.region)) {
        regions.set(country.region, [country]);
      } else {
        regions.get(country.region)!.push(country);
      }

      return regions;
    }, new Map<string, Country[]>())
    .forEach((countryList, region) => {
      regions[region] = countryList;
    });

  return regions;
}

export default RegionCountries;

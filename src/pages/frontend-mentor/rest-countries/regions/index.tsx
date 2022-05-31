import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { allCountries } from "#lib/api/rest-countries";
import { createServerSideProps } from "#server/requests";
import { GalleryList } from "#components/lists";
import { LocalNav } from "#components/fancy";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";

import type {
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#lib/api/rest-countries";

interface IProps {
  regions: Record<string, Country[]>;
}

interface IParams extends ParsedUrlQuery {}

function RegionCountries({
  localeInfo,
  regions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    localeInfo,
    title: "Countries by Regions",
    description: "Countries by Regions",
    canonicalPath: "/frontend-mentor/rest-countries/regions",
  });
  const regionList = Object.keys(regions).map((region) => {
    return {
      title: region,
      id: region.trim().toLowerCase(),
    };
  });

  return (
    <Page seoTags={seoTags}>
      <LocalNav items={regionList}>Regions</LocalNav>
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
    </Page>
  );
}

RegionCountries.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = createServerSideProps<IProps, IParams>(
  { extraLangNamespaces: ["frontend-mentor"] },
  async () => {
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
  }
);

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

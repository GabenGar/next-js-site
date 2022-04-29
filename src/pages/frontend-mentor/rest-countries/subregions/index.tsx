import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
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
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {
  subregions: {
    [subregion: string]: Country[];
  };
}

interface IParams extends ParsedUrlQuery {}

function RegionCountries({
  localeInfo,
  subregions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    localeInfo,
    title: "Countries by Subregions",
    description: "Countries by Subregions",
    canonicalPath: "/frontend-mentor/rest-countries/subregions",
  });
  const subRegionList = Object.keys(subregions).map((subregion) => {
    return {
      title: subregion,
      id: subregion.trim().toLowerCase(),
    };
  });

  return (
    <Page seoTags={seoTags}>
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
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
}) => {
  const countries = await allCountries();

  if (!countries) {
    return {
      notFound: true,
    };
  }

  const subregions = sortCountriesBySubRegions(countries);

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
  ]);

  return {
    props: {
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
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

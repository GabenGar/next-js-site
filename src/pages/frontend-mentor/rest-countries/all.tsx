import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { createSEOTags } from "#lib/seo";
import { allCountries } from "#lib/api/rest-countries";
import { CardList } from "#components/lists/card-list";
import { LoadingBar } from "#components/state";
import { Pagination } from "#components/pagination";
import {
  Form,
  SubmitSection,
  TextSection,
  SelectSection,
} from "#components/fancy/form";
import { Option } from "#components/fancy/input";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";
import styles from "./all.module.scss";

import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { FormEvent } from "react";
import type { Country } from "#lib/api/rest-countries";

interface IProps {
  countries: Country[];
}

const limit = 25;

export default function RESTCountriesAllPage({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation("frontend-mentor");
  const [currentPage, changeCurrentPage] = useState(1);
  const [filteredCountries, filterCountries] = useState(countries);
  const [currentCountries, changeCurrentCountries] = useState<Country[]>([]);
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: "All Countries",
    description: "All Countries",
  });
  const regions = Array.from(
    countries.reduce(
      (prev, current) => prev.add(current.region),
      new Set<string>()
    )
  );
  const pageTitle = "All Countries";

  useEffect(() => {
    const currentRange = [(currentPage - 1) * limit, currentPage * limit];
    const slicedCountries = filteredCountries.slice(...currentRange);
    changeCurrentCountries(() => slicedCountries);
  }, [filteredCountries, currentPage]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name =
      // @ts-expect-error `elements` can be accessed by `name`
      (form.elements["country-name"] as HTMLInputElement).value.toLowerCase();
    const region =
      // @ts-expect-error same
      (form.elements["country-region"] as HTMLSelectElement).value;
    const filteredByName = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(name) &&
        (region ? country.region === region : true)
    );
    filterCountries(() => filteredByName);
    changeCurrentPage(() => 1);
  }

  if (!countries) {
    return <LoadingBar />;
  }

  return (
    <Page seoTags={seoTags}>
      <Form className={styles.search} onSubmit={handleSearch}>
        <TextSection id="country-search" name="country-name">
          Name:
        </TextSection>
        <SelectSection
          id="country-region"
          label={"Region:"}
          name="country-region"
        >
          <Option key="base-key" value="">
            All
          </Option>
          {regions.map((region) => (
            <Option key={region} value={region}>
              {region}
            </Option>
          ))}
        </SelectSection>
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
    </Page>
  );
}

RESTCountriesAllPage.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  locale,
}) => {
  const countries = await allCountries();

  if (!countries) {
    return {
      notFound: true,
    };
  }

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
      countries,
    },
  };
};

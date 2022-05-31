import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { countriesByRegion } from "#lib/api/rest-countries";
import { createServerSideProps } from "#server/requests";
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
import type { BasePageProps } from "#types/pages";

interface IProps {
  region: string;
  countries: Country[];
}

interface IParams extends ParsedUrlQuery {
  region: string;
}

function RegionDetails({
  localeInfo,
  region,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("frontend-mentor");
  const pageTitle = `${countries.length} countries of ${region}`;
  const seoTags = createSEOTags({
    localeInfo,
    title: pageTitle,
    description: pageTitle,
  });

  return (
    <Page seoTags={seoTags}>
      <CardList>
        {countries.map((country) => (
          <CountryCard key={country.cca2} country={country} />
        ))}
      </CardList>
    </Page>
  );
}

RegionDetails.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = createServerSideProps<IProps, IParams>(
  { extraLangNamespaces: ["frontend-mentor"] },
  async ({ params }) => {
    const { region } = params!;
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
  }
);

export default RegionDetails;

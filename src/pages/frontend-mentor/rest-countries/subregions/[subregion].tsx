import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { countriesByRegion as countriesBySubRegion } from "#lib/api/rest-countries";
import { createServerSideProps } from "#server/requests";
import { CardList } from "#components/lists/card-list";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { CountryCard } from "#components/frontend-mentor";

import type { InferGetServerSidePropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#lib/api/rest-countries";

interface IProps {
  subregion: string;
  countries: Country[];
}

interface IParams extends ParsedUrlQuery {
  subregion: string;
}

function SubRegionDetails({
  localeInfo,
  subregion,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("frontend-mentor");
  const pageTitle = `${countries.length} countries of ${subregion}`;
  const seoTags = createSEOTags({
    localeInfo,
    title: pageTitle,
    description: pageTitle,
    canonicalPath: `/frontend-mentor/rest-countries/subregions/${subregion}`,
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

SubRegionDetails.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = createServerSideProps<IProps, IParams>(
  { extraLangNamespaces: ["frontend-mentor"] },
  async ({ params }) => {
    const { subregion: region } = params!;
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
  }
);

export default SubRegionDetails;

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { countriesByRegion as countriesBySubRegion } from "#lib/api/rest-countries";
import { CardList } from "#components/lists/card-list";
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

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
  params,
}) => {
  const { subregion: region } = params!;
  const countries = await countriesBySubRegion(region);

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
      subregion: region,
      countries,
    },
  };
};

export default SubRegionDetails;

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

export default function RESTCountriesPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    localeInfo,
    title: "REST Countries",
    description: "REST Countries Frontend Mentor Challenge",
    canonicalPath: "/frontend-mentor/rest-countries",
  });

  return (
    <Page seoTags={seoTags}>
      <nav>
        <ul>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/all",
              }}
            >
              All Countries
            </LinkInternal>
          </li>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/regions",
              }}
            >
              Regions
            </LinkInternal>
          </li>
          <li>
            <LinkInternal
              href={{
                pathname: "/frontend-mentor/rest-countries/subregions",
              }}
            >
              Subregions
            </LinkInternal>
          </li>
        </ul>
      </nav>
    </Page>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
}) => {
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
    },
  };
};

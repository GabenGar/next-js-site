import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";

import type { NextPage, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";

interface IProps {}

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

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["frontend-mentor"],
});

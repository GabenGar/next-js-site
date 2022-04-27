import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

export default function RESTCountriesPage({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const router = useRouter();
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: "REST Countries",
    description: "REST Countries Frontend Mentor Challenge",
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

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  const { locale } = context;

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

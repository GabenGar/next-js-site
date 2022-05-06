import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { DAY } from "#environment/constants/durations";
import { createRange } from "#lib/util";
import { createSEOTags } from "#lib/seo";
import { getProfiles } from "#lib/account";
import { countTable } from "#database";
import { Redirect } from "#server/requests";
import { Page } from "#components/pages";
import { CardList } from "#components/lists";
import { ProfileCard } from "#components/entities/profiles";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPathsResult,
} from "next";
import type { IAccountProfileClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import type { IPagination } from "#lib/pagination";

interface IProps extends BasePageProps {
  pagination: IPagination;
  profiles: IAccountProfileClient[];
}

interface IParams extends ParsedUrlQuery {
  page: string;
}

const limit = 25;

function Profiles({
  localeInfo,
  profiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("profiles_title"),
    description: t("profiles_desc"),
    canonicalPath: "/profiles",
  });

  return (
    <Page seoTags={seoTags}>
      <CardList>
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </CardList>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths<IParams> = async ({ locales }) => {
  const profileCount = await countTable({
    schema: "accounts",
    table: "profiles",
  });
  const pageCount = Math.ceil(profileCount / limit);
  console.log(
    `profileCount: ${typeof profileCount}\n`,
    `pageCount: ${typeof pageCount}`
  );

  const pagination = createRange(pageCount);
  const paths = pagination.reduce<GetStaticPathsResult<IParams>["paths"]>(
    (paths, page) => {
      const localePaths = locales!.map<{
        locale: string;
        params: {
          page: string;
        };
      }>((locale) => {
        return {
          locale,
          params: {
            page: String(page),
          },
        };
      });

      paths.push(...localePaths);

      return paths;
    },
    []
  );

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
  params,
}) => {
  const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

  if (!params?.page) {
    const profileCount = await countTable({
      schema: "accounts",
      table: "profiles",
    });
    const pageCount = Math.ceil(profileCount / limit);
    const lastPagePage = `/profiles/${pageCount}`;

    return new Redirect(localeInfo, lastPagePage, FOUND);
  }

  const { page } = params;
  const { pagination, profiles } = await getProfiles({
    currentPage: Number(page),
  });

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  return {
    props: {
      ...localization,
      localeInfo,
      pagination,
      profiles,
    },
    revalidate: DAY / 1000,
  };
};

export default Profiles;

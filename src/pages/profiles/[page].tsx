import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { DAY } from "#environment/constants/durations";
import { createRange } from "#lib/util";
import { createSEOTags } from "#lib/seo";
import { getProfiles } from "#lib/account";
import { ProjectURL } from "#lib/url";
import { toJSON } from "#lib/json";
import { countTable } from "#database";
import { Redirect, createServerSideProps } from "#server/requests";
import { Page } from "#components/pages";
import { CardList } from "#components/lists";
import { ProfileCard } from "#components/entities/profiles";
import { PaginationInternal } from "#components/pagination";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPathsResult,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { IAccountProfileClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import type { IPagination } from "#lib/pagination";

interface IProps {
  pagination: IPagination;
  profiles: IAccountProfileClient[];
}

interface IParams extends ParsedUrlQuery {
  page: string;
}

const limit = 25;

function Profiles({
  localeInfo,
  pagination,
  profiles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("profiles_title"),
    description: t("profiles_desc"),
    canonicalPath: `/profiles/${pagination.currentPage}`,
  });

  return (
    <Page seoTags={seoTags}>
      <PaginationInternal
        baseURL="/profiles"
        urlBuilder={(page) => {
          const profilesURL = new ProjectURL(localeInfo, `/profiles/${page}`);
          return profilesURL;
        }}
        pagination={pagination}
      />
      <CardList isLayoutShown={false}>
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </CardList>
    </Page>
  );
}

// export const getStaticPaths: GetStaticPaths<IParams> = async ({ locales }) => {
//   const profileCount = await countTable({
//     schema: "accounts",
//     table: "profiles",
//   });
//   const pageCount = Math.ceil(profileCount / limit);
//   const pagination = createRange(pageCount);
//   const paths = pagination.reduce<GetStaticPathsResult<IParams>["paths"]>(
//     (paths, page) => {
//       const localePaths: GetStaticPathsResult<IParams>["paths"] = locales!.map(
//         (locale) => {
//           return {
//             locale,
//             params: {
//               page: String(page),
//             },
//           };
//         }
//       );

//       paths.push(...localePaths);

//       return paths;
//     },
//     []
//   );

//   return {
//     paths,
//     fallback: true,
//   };
// };

export const getServerSideProps = createServerSideProps<IProps, IParams>(
  { extraLangNamespaces: ["common"] },
  async (context) => {
    const { params } = context;

    if (!params?.page) {
      const profileCount = await countTable({
        schema: "accounts",
        table: "profiles",
      });
      const pageCount = Math.ceil(profileCount / limit);
      const lastPage = `/profiles/${pageCount}`;

      return Redirect.fromContext(context, lastPage, FOUND);
    }

    const { page } = params;

    const { pagination, profiles } = await getProfiles({
      currentPage: Number(page),
    });

    const props = {
      pagination,
      profiles,
    };

    // console.log(toJSON(props));

    return {
      props,
    };
  }
);

export default Profiles;

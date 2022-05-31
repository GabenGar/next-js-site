import { useTranslation } from "next-i18next";
import { DAY } from "#environment/constants/durations";
import { createSEOTags } from "#lib/seo";
import { createServerSideProps } from "#server/requests";
import { getTableIDs } from "#database";
import { getProfile } from "#database/queries/account/profile";
import { Page } from "#components/pages";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import { Image } from "#components/images";

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

interface IProps {
  profile: IAccountProfileClient;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

function Profile({
  localeInfo,
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("components");
  const { id, full_name, created_at, updated_at, avatar_url } = profile;
  const seoTags = createSEOTags({
    localeInfo,
    title: full_name ?? t("profile_anonymous"),
    description: full_name ?? t("profile_anonymous"),
    canonicalPath: `/profile/${id}`,
  });

  return (
    <Page seoTags={seoTags}>
      <Article>
        {avatar_url && (
          <ArticleHeader>
            <Image src={avatar_url} />
          </ArticleHeader>
        )}
        <ArticleBody>
          <DL>
            <DS
              dKey={t("profile_joined")}
              dValue={<DateTimeView dateTime={created_at} />}
            />
            <DS
              dKey={t("profile_last_activity")}
              dValue={<DateTimeView dateTime={updated_at} />}
            />
          </DL>
        </ArticleBody>
      </Article>
    </Page>
  );
}

// export const getStaticPaths: GetStaticPaths<IParams> = async ({ locales }) => {
//   const ids = await getTableIDs({
//     schema: "accounts",
//     table: "profiles",
//   });

//   const paths = ids.reduce<GetStaticPathsResult<IParams>["paths"]>(
//     (paths, id) => {
//       const localedIDs: GetStaticPathsResult<IParams>["paths"] = locales!.map(
//         (locale) => {
//           return {
//             params: { id: String(id) },
//             locale,
//           };
//         }
//       );

//       paths.push(...localedIDs);

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
  async ({ params }) => {
    if (!params?.id) {
      return {
        notFound: true,
        // revalidate: DAY / 1000,
      };
    }

    const { id } = params;

    const { account_id, ...profile } = await getProfile(Number(id));

    return {
      props: {
        profile,
      },
      // revalidate: DAY / 1000,
    };
  }
);

export default Profile;

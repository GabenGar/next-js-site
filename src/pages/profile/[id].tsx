import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DAY } from "#environment/constants/durations";
import { createSEOTags } from "#lib/seo";
import { getTableIDs } from "#database";
import { getProfile } from "#database/queries/account/profile";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";
import { Article, ArticleBody } from "#components/articles";
import { DL, DS } from "#components/lists/d-list";

import type { ParsedUrlQuery } from "querystring";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPathsResult,
} from "next";
import type { IAccountProfileClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";
import { DateTimeView } from "#components/dates";

interface IProps extends BasePageProps {
  profile: IAccountProfileClient;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

function Profile({
  localeInfo,
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const { id, full_name, created_at, updated_at } = profile;
  const seoTags = createSEOTags({
    localeInfo,
    title: full_name ?? "Anonymous",
    description: t("profile_desc"),
    canonicalPath: `/profile/${id}`,
  });

  return (
    <Page seoTags={seoTags}>
      <Article>
        <ArticleBody>
          <DL>
            <DS
              dKey={"Joined"}
              dValue={<DateTimeView dateTime={created_at} />}
            />
            <DS
              dKey={"Last Activity"}
              dValue={<DateTimeView dateTime={updated_at} />}
            />
          </DL>
        </ArticleBody>
      </Article>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths<IParams> = async ({ locales }) => {
  const ids = await getTableIDs({
    schema: "accounts",
    table: "profiles",
  });

  const paths = ids.reduce<GetStaticPathsResult<IParams>["paths"]>(
    (paths, id) => {
      const localedIDs: GetStaticPathsResult<IParams>["paths"] = locales!.map(
        (locale) => {
          return {
            params: { id: String(id) },
            locale,
          };
        }
      );

      paths.push(...localedIDs);

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

  if (!params?.id) {
    return {
      notFound: true,
      revalidate: DAY / 1000,
    };
  }

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  const { id } = params;

  const { account_id, ...profile } = await getProfile(Number(id));

  return {
    props: {
      ...localization,
      localeInfo,
      profile,
    },
    revalidate: DAY / 1000,
  };
};

export default Profile;

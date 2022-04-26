import { useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { useAppDispatch, useAppSelector } from "#store/redux";
import { getFMCommentsAsync, selectFMSlice } from "#store/redux/reducers";
import { Page } from "#components/pages";
import {
  Article,
  ArticleHeader,
  ArticleFooter,
  ArticleBody,
} from "#components/articles";
import { Heading } from "#components/headings";
import { CardList } from "#components/lists";
import {
  FMCommentCard,
  NewCommentForm,
} from "#components/frontend-mentor/interactive-comments";
import { JSONView } from "#components/json";
import { LoadingBar } from "#components/state";
import styles from "./index.module.scss";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface FMCommentsPageProps extends BasePageProps {}

interface FMCommentsPageParams extends ParsedUrlQuery {}

function FMCommentsPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("frontend-mentor");
  const dispatch = useAppDispatch();
  const { comments, status, error } = useAppSelector(selectFMSlice);
  const title = t("comments_title");

  useEffect(() => {
    dispatch(getFMCommentsAsync());
  }, []);

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("challenge_desc", { title })} />
      </Head>
      <Article className={styles.comments}>
        <ArticleHeader>
          <Heading level={2}>{t("comments_section")}</Heading>
        </ArticleHeader>
        <ArticleBody>
          {error && <JSONView json={error} />}
          <CardList
            className={styles.list}
            isLayoutShown={false}
            defaultLayout="phone"
          >
            {status === "loading" ? (
              <LoadingBar />
            ) : comments.length ? (
              comments.map((comment) => (
                <FMCommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <Article>{t("comments_none")}</Article>
            )}
          </CardList>
        </ArticleBody>
        <ArticleFooter>
          <NewCommentForm />
        </ArticleFooter>
      </Article>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<
  FMCommentsPageProps,
  FMCommentsPageParams
> = async (context) => {
  const { locale } = context;

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
    "fm-comments",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default FMCommentsPage;

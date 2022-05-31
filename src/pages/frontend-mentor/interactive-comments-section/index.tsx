import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests";
import { useAppDispatch, useAppSelector } from "#browser/store/redux";
import {
  getFMCommentsAsync,
  selectFMSlice,
} from "#browser/store/redux/reducers";
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

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";

interface IProps {}

interface IParams extends ParsedUrlQuery {}

function FMCommentsPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("frontend-mentor");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("comments_title"),
    description: t("challenge_desc", { title: t("comments_title") }),
    canonicalPath: "/frontend-mentor/interactive-comments-section",
  });
  const { comments, status, error } = useAppSelector(selectFMSlice);

  useEffect(() => {
    dispatch(getFMCommentsAsync());
  }, []);

  return (
    <Page seoTags={seoTags}>
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

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["frontend-mentor", "fm-comments"],
});

export default FMCommentsPage;

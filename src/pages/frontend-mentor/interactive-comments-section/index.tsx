import { useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { useAccount } from "#lib/hooks";
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
import { CardList, listLayouts } from "#components/lists";
import {
  FMCommentCard,
  NewCommentForm,
} from "#components/frontend-mentor/interactive-comments";
import { JSONView } from "#components/json";
import styles from "./index.module.scss";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface FMCommentsPageProps extends BasePageProps {}

interface FMCommentsPageParams extends ParsedUrlQuery {}

function FMCommentsPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();
  const { comments, status, error } = useAppSelector(selectFMSlice);
  const title = "Interactive comments section";

  useEffect(() => {
    dispatch(getFMCommentsAsync());
  }, []);

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta
          name="description"
          content={`Frontend Mentor Challenge: ${title}`}
        />
      </Head>
      <Article>
        <ArticleHeader>
          <Heading>The challenge</Heading>
        </ArticleHeader>
        <ArticleBody>
          <p>Your users should be able to:</p>

          <ul>
            <li>
              View the optimal layout for the app depending on their
              device&apos;s screen size
            </li>
            <li>See hover states for all interactive elements on the page</li>
            <li>Create, Read, Update, and Delete comments and replies</li>
            <li>
              **Bonus**: If you&apos;re building a purely front-end project, use
              `localStorage` to save the current state in the browser that
              persists when the browser is refreshed.
            </li>
          </ul>
        </ArticleBody>
      </Article>
      <Article>
        <ArticleHeader>
          <Heading>Expected behaviour</Heading>
        </ArticleHeader>
        <ArticleBody>
          <ul>
            <li>
              First-level comments should be ordered by their score, whereas
              nested replies are ordered by time added.
            </li>
            <li>
              Replying to a comment adds the new reply to the bottom of the
              nested replies within that comment.
            </li>
            <li>
              A confirmation modal should pop up before a comment or reply is
              deleted.
            </li>
            <li>
              Adding a new comment or reply uses the `currentUser` object from
              within the `data.json` file.
            </li>
            <li>You can only edit or delete your own comments and replies.</li>
          </ul>
        </ArticleBody>
      </Article>
      <Article className={styles.comments}>
        <ArticleHeader>
          <Heading level={2}>Comments</Heading>
        </ArticleHeader>
        <ArticleBody>
          {error && <JSONView json={error} />}
          <CardList
            className={styles.list}
            isLayoutShown={false}
            defaultLayout="phone"
          >
            {status === "loading" ? (
              <div>Loading...</div>
            ) : comments.length ? (
              comments.map((comment) => (
                <FMCommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <Article>No comments available.</Article>
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
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default FMCommentsPage;

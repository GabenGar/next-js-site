import { useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { CommentList, NewCommentForm } from "#components/entities/comments";
import { useAppDispatch, useAppSelector } from "#store/redux";
import { getCommentsAsync, selectComments } from "#store/redux/reducers";
import { useAccount } from "#lib/hooks";
import {
  Article,
  ArticleHeader,
  ArticleFooter,
  ArticleBody,
} from "#components/articles";
import { Heading } from "#components/headings";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface FMCommentsPageProps extends BasePageProps {}

interface FMCommentsPageParams extends ParsedUrlQuery {}

function FMCommentsPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();
  const { account } = useAccount();
  const comments = useAppSelector(selectComments());
  const title = "Interactive comments section";

  useEffect(() => {
    dispatch(getCommentsAsync());
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
          <p>
            Your challenge is to build out this interactive comments section and
            get it looking as close to the design as possible.
          </p>

          <p>
            You can use any tools you like to help you complete the challenge.
            So if you&apos;ve got something you&apos;d like to practice, feel
            free to give it a go.
          </p>

          <p>
            We provide the data in a local `data.json` file, so use that to
            populate the content on the first load. If you want to take it up a
            notch, feel free to build this as a full-stack CRUD application!
          </p>

          <p>Your users should be able to:</p>

          <ul>
            <li>
              View the optimal layout for the app depending on their
              device&apos;s screen size
            </li>
            <li>See hover states for all interactive elements on the page</li>
            <li>Create, Read, Update, and Delete comments and replies</li>
            <li>Upvote and downvote comments</li>
            <li>
              **Bonus**: If you&apos;re building a purely front-end project, use
              `localStorage` to save the current state in the browser that
              persists when the browser is refreshed.
            </li>
            <li>
              **Bonus**: Instead of using the `createdAt` strings from the
              `data.json` file, try using timestamps and dynamically track the
              time since the comment or reply was posted.
            </li>
          </ul>
        </ArticleBody>
        <ArticleFooter>
          Want some support on the challenge? [Join our Slack
          community](https://www.frontendmentor.io/slack) and ask questions in
          the **#help** channel.
        </ArticleFooter>
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
      <Article>
        <ArticleHeader>
          <Heading>Where to find everything</Heading>
        </ArticleHeader>
        <ArticleBody>
          <p>
            Your task is to build out the project to the designs inside the
            `/design` folder. You will find both a mobile and a desktop version
            of the design.
          </p>

          <p>
            The designs are in JPG static format. Using JPGs will mean that
            you&apos;ll need to use your best judgment for styles such as
            `font-size`, `padding` and `margin`.
          </p>

          <p>
            If you would like the design files (we provide Sketch & Figma
            versions) to inspect the design in more detail, you can [subscribe
            as a PRO member](https://www.frontendmentor.io/pro).
          </p>

          <p>
            You will find all the required assets in the `/images` folder. The
            assets are already optimized.
          </p>

          <p>
            There is also a `style-guide.md` file containing the information
            you&apos;ll need, such as color palette and fonts.
          </p>
        </ArticleBody>
      </Article>
      <Article>
        <ArticleHeader>
          <Heading>Comments</Heading>
        </ArticleHeader>
        <ArticleBody>
          <CommentList comments={comments} />
        </ArticleBody>
        <ArticleFooter>{account && <NewCommentForm />}</ArticleFooter>
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

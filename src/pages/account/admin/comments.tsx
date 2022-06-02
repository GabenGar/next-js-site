import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createAdminProps } from "#server/requests";
import { useAppDispatch, useAppSelector } from "#browser/store/redux";
import {
  getPendingCommentsAsync,
  selectPendingComments,
} from "#browser/store/redux/reducers";
import { Page } from "#components/pages";
import { Heading } from "#components/headings";
import { CardList } from "#components/lists";
import { CommentCard } from "#components/entities/comments";

import type { InferGetServerSidePropsType } from "next";

interface IProps {}

function CommentsPage({
  localeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("comments_title"),
    description: t("comments_desc"),
  });
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectPendingComments());

  useEffect(() => {
    dispatch(getPendingCommentsAsync());
  }, []);

  return (
    <Page seoTags={seoTags}>
      <Heading level={2}>Pending for approval</Heading>
      <CardList>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isReplyShown={false}
          />
        ))}
      </CardList>
    </Page>
  );
}

export const getServerSideProps = createAdminProps<IProps>({
  extraLangNamespaces: ["admin"],
});

export default CommentsPage;

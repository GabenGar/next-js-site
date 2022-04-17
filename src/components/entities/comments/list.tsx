import { blockComponent } from "#components/meta";
import { CardList } from "#components/lists";
import { Article } from "#components/articles";
import { CommentCard } from "./card";
// import styles from "./card.module.scss";

import type { ICommentClient } from "#types/entities";
import type { ICardListProps } from "#components/lists";

export interface ICommentListProps extends ICardListProps {
  comments: ICommentClient[];
}

export const CommentList = blockComponent<ICommentListProps>(
  undefined,
  Component
);

function Component({ comments, ...blockProps }: ICommentListProps) {
  return (
    <CardList {...blockProps}>
      {comments.length ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <Article>No comments available.</Article>
      )}
    </CardList>
  );
}

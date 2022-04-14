import { getDB } from "#database";
import { IComment, ICommentInit } from "#types/entities";

const { db } = getDB();

export async function getAllPublicComments() {
  const query = `
    SELECT *
    FROM comments
    WHERE is_public = true
  `;

  const comments = await db.manyOrNone<IComment>(query);

  return comments;
}

export async function addComment(accountID: number, commentInit: ICommentInit) {
  const query = `
    INSERT INTO comments
      (account_id, parent_id, blog_slug, content)
    VALUES (
      $(account_id),
      $(parent_id),
      $(blog_slug),
      $(content)
    )
    RETURNING *
  `;
  const queryArgs = {
    account_id: accountID,
    ...commentInit,
  };

  const newComment = await db.one<IComment>(query, queryArgs);

  return newComment;
}

export async function approveComment(commentID: number) {
  const query = `
    UPDATE comments
    SET is_public = true
    WHERE id = &(comment_id)
    RETURNING *
  `;
  const queryArgs = {
    comment_id: commentID,
  };

  const approvedComment = await db.one<IComment>(query, queryArgs);

  return approvedComment;
}

export async function removeComment(accountID: number, commentID: number) {
  const query = `
    DELETE FROM comments
    WHERE
      id = $(comment_id)
      AND account_id = $(account_id)
    RETURNING *
  `;
  const queryArgs = {
    comment_id: commentID,
    acount_id: accountID,
  };

  const removedComment = await db.one<IComment>(query, queryArgs);

  return removedComment;
}

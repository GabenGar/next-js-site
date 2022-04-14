import { getDB } from "#database";
import { IComment, ICommentInit } from "#types/entities";

const { db } = getDB();

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

  const newComment = await db.one<IComment>(query, {
    account_id: accountID,
    ...commentInit,
  });

  return newComment;
}

export async function removeComment(accountID: number, commentID: number) {
  const query = `
    DELETE FROM comments
    WHERE
      id = $(comment_id)
      AND account_id = $(account_id)
    RETURNING *
  `;

  const removedComment = await db.one<IComment>(query, {
    comment_id: commentID,
    acount_id: accountID,
  });

  return removedComment;
}

import { getDB } from "#database";
import { IComment, ICommentInit } from "#types/entities";

const { db } = getDB();

export async function getAllPublicComments() {
  const query = `
    SELECT *
    FROM comments.entries
    WHERE is_public = true
  `;

  const comments = await db.manyOrNone<IComment>(query);

  return comments;
}

export async function addComment(accountID: number, commentInit: ICommentInit) {
  const query = `
    INSERT INTO comments.entries
      (account_id, parent_id, content)
    VALUES (
      $(account_id),
      $(parent_id),
      $(content)
    )
    RETURNING *
  `;
  const queryArgs = {
    account_id: accountID,
    ...commentInit,
  };

  const newComment = await db.one<IComment>(query, queryArgs);

  if (commentInit.blog_slug) {
    const blogQuery = `
      INSERT INTO comments.blog
        (comment_id, blog_slug)
      VALUES (
        $(comment_id),
        $(blog_slug)
      )
      RETURNING blog_slug
    `;
    const blogQueryArgs = {
      comment_id: newComment.id,
      blog_slug: commentInit.blog_slug,
    };
    const blog_slug = await db.one<string>(blogQuery, blogQueryArgs);

    newComment.blog_slug = blog_slug;
  }

  return newComment;
}

export async function approveComment(commentID: number) {
  const query = `
    UPDATE comments.entries
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
    DELETE FROM comments.entries
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

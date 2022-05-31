import { getDB } from "#database";
import { DatabaseError } from "#server/errors";
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

export async function addComment(
  accountID: number,
  commentInit: ICommentInit
): Promise<IComment> {
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
    blog_slug: commentInit.blog_slug,
    content: commentInit.content,
    parent_id: commentInit.parent_id,
  };

  const newComment = await db.txIf<IComment>(
    { cnd: Boolean(commentInit.blog_slug) },
    async (t) => {
      const newComment = await t.one<IComment>(query, queryArgs);

      // executed as a task
      if (!commentInit.blog_slug) {
        return newComment;
      }

      // executed as a transaction
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

      return newComment;
    }
  );
  return newComment;
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

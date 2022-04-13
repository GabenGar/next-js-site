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

  const newConmment = await db.one<IComment>(query, {
    account_id: accountID,
    ...commentInit,
  });

  return newConmment;
}

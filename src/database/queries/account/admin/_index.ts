import { getDB } from "#database";

import type { IAccount, IComment, ISerialInteger } from "#types/entities";
import type { IPaginationDB } from "#lib/pagination";
import type { IInvite } from "#codegen/schema/interfaces";

const { db } = getDB();

export async function getAdmins() {
  const query = `
    SELECT *
    FROM accounts.entries
    WHERE role = 'administrator'
    ORDER BY
      id ASC
  `;

  const admins = await db.manyOrNone<IAccount>(query);

  return admins;
}

export async function getAccounts({ offset, limit }: IPaginationDB) {
  const query = `
    SELECT *
    FROM accounts.entries
    ORDER BY
      created_at DESC
    OFFSET $(offset)
    LIMIT $(limit)
  `;

  const accounts = await db.manyOrNone<IAccount>(query, { offset, limit });
  return accounts;
}

export async function clearAccounts() {
  const query = "TRUNCATE TABLE accounts.entries CASCADE";

  await db.none(query);
  return true;
}

async function getDBInfo() {
  const query = `
  `;
  const tableInfo = await db.none(query);

  return tableInfo;
}

export async function getInvites() {
  const query = `
    SELECT *
    FROM accounts.invites
    ORDER BY
      created_at DESC
  `;

  const invites = await db.manyOrNone<IInvite>(query);

  return invites;
}

export async function queryPendingComments() {
  const query = `
    SELECT *
    FROM comments.entries
    WHERE
      is_public = false
    ORDER BY
      id ASC
  `;

  const comments = await db.manyOrNone<IComment>(query);
  return comments;
}

export async function approveComment(commentID: number) {
  const query = `
    UPDATE comments.entries
    SET is_public = true
    WHERE id = $(comment_id)
    RETURNING *
  `;
  const queryArgs = {
    comment_id: commentID,
  };

  const approvedComment = await db.one<IComment>(query, queryArgs);

  return approvedComment;
}

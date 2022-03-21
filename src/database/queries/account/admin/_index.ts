import { getDB } from "#database";

import type { IAccount } from "#types/entities";
import type { PaginationDB } from "#lib/pagination";
import type { IInvite } from "#codegen/schema/interfaces";

const { db } = getDB();

export async function getAccounts({ offset, limit }: PaginationDB) {
  const query = `
    SELECT *
    FROM accounts
    ORDER BY
      created_at DESC
    OFFSET $(offset)
    LIMIT $(limit)
  `;

  const accounts = await db.manyOrNone<IAccount>(query, { offset, limit });
  return accounts;
}

export async function clearAccounts() {
  const query = "TRUNCATE TABLE accounts CASCADE";

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
    FROM invites
    ORDER BY
      created_at DESC
  `;

  const invites = await db.manyOrNone<IInvite>(query);

  return invites;
}

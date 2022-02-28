import { getDB } from "#database";
import databaseSchema from "#schema/database.schema.json";

import type { Account } from "#types/entities";
import type { PaginationDB } from "#lib/pagination";

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

  const accounts = await db.manyOrNone<Account>(query, { offset, limit });
  return accounts;
}

export async function clearAccounts() {
  const query = "TRUNCATE TABLE accounts CASCADE";

  await db.none(query);
  return true;
}

async function getDBInfo() {
  const query = `
  `
  const tableInfo = await db.none(query);
}
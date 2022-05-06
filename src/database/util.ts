import { getDB } from "./lib";

import type { IDatabase, ITask, IMain } from "pg-promise";

const { db } = getDB();

/**
 * @TODO string literal unions
 */
export interface ICountTableProps {
  schema: string;
  table: string;
  /**
   * A `pg-promise` task/transaction context if the counting needs to be done within them.
   * @default IDatabase<IMain>
   */
  ctx?: IDatabase<IMain> | ITask<IMain>;
}

/**
 * Counts the amount of rows in a table.
 * @param context
 */
export async function countTable({
  ctx = db,
  schema,
  table,
}: ICountTableProps): Promise<number> {
  const query = `
    SELECT count(*)
    FROM ${schema}.${table}
  `;

  const result = await ctx.one<{ count: string }>(query);
  const count = Number(result.count);

  return count;
}

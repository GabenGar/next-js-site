import { getDB } from "./lib";

const { db } = getDB();

/**
 * @TODO string literal unions
 */
export interface ICountTableProps {
  schema: string;
  table: string;
}

/**
 * Counts the amount of rows in a table.
 */
export async function countTable({
  schema,
  table,
}: ICountTableProps): Promise<number> {
  const query = `
    SELECT count(*)
    FROM ${schema}.${table}
  `;

  const count = await db.one<number>(query);
  
  return count;
}

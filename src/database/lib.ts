import path from "path";
import pgLib from "pg-promise";
import { QueryFile } from "pg-promise";

import { DATABASE_URL } from "#environment/vars";
import { createSingleton } from "#lib/util";

import type { IInitOptions, IDatabase, IMain } from "pg-promise";

interface IDatabaseScope {
  db: IDatabase<IMain>;
  pgp: IMain;
}

const initOptions: IInitOptions = {};
// const connParams: IConnectionParameters<IClient> = DATABASE_CLIENT_CONFIG;
const pgp = pgLib(initOptions);

// Type id-s supported by PostgreSQL, copied from:
// http://github.com/brianc/node-pg-types/blob/master/lib/builtins.js
// return date strings as strings
pgp.pg.types.setTypeParser(1184, (dateString) => dateString);
// return bigints as `BigInt` instead of string
// pgp.pg.types.setTypeParser(20, BigInt);

/**
 * @link https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise#answer-34427278
 */
export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("db-scope", () => {
    return {
      db: pgp(DATABASE_URL),
      pgp,
    };
  });
}

export async function testConnection(db: IDatabase<any>) {
  // try to connect
  const conn = await db.connect();
  // success, release connection
  conn.done();
  // return server version
  return conn.client.serverVersion;
}

export function sqlQuery(file_path: string) {
  const absolutePath = path.resolve(file_path);
  return new QueryFile(absolutePath, { minify: true });
}

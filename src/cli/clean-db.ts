import fse from "fs-extra";
import path from "path";
import { CONFIGS_FOLDER } from "#environment/constants";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getDB } from "#database";

import type { IProjectDatabase, ISchema } from "#codegen/schema/interfaces";
import type { DatabaseTable } from "./types";

(async () => {
  try {
    await cleanDatabase();
  } catch (error) {
    console.error("Aborting database cleanup due to error:\n", error);
  }
})();

async function cleanDatabase() {
  if (!IS_DEVELOPMENT) {
    console.log("Cleanup isn't started in dev mode, aborting.");
    return;
  }
  const { db } = getDB();
  console.log("Starting database cleanup.");

  const dbConfigPath = path.join(CONFIGS_FOLDER, "database.json");
  const dbConfig: IProjectDatabase = fse.readJSONSync(dbConfigPath);
  // @ts-expect-error the keys are known beforehand.
  const dbTables = Object.entries<ISchema>(dbConfig.schemas).reduce<
    DatabaseTable[]
  >((dbTables, [schemaName, schema]) => {
    Object.entries<string>(schema.tables).forEach(([tableName, desciption]) => {

      dbTables.push({
        schema: schemaName,
        table: tableName,
        description: desciption,
      });
    });

    return dbTables;
  }, []);

  const dbList = dbTables.map<string>(({ schema, table, description }) => {
    return `"${schema}.${table}" - ${description}`;
  });
  const tableList = dbTables.map(({ schema, table }) => {
    return `${schema}.${table}`;
  });

  const query = `
    DROP TABLE ${tableList.join(", ")} CASCADE
  `;
  console.log(
    `These database tables are going to be dropped:\n\n${dbList.join("\n")}\n`
  );

  await db.none(query);
  console.log(`Dropped these tables:\n\n${dbList.join("\n")}\n`);
  console.log("Finished database cleanup.");
}

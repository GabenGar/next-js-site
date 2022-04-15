import fse from "fs-extra";
import path from "path";
import { CONFIGS_FOLDER } from "#environment/constants";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getDB } from "#database";

import type { IProjectDatabase, ISchema } from "#codegen/schema/interfaces";

interface DatabaseTable {
  schema: string;
  table: string;
  description: string;
}

(async () => {
  try {
    await cleanDatabase();
  } catch (error) {
    console.error("Aborting database reset due to error:\n", error);
  }
})();

/**
 * Resets the database and the state of the tables without dropping them.
 */
async function cleanDatabase() {
  if (!IS_DEVELOPMENT) {
    console.log("Reset is started in production mode, aborting.");
    return;
  }

  const { db } = getDB();

  console.log("Starting database reset.");

  const migrationsTable = "pgmigrations";

  const dbConfigPath = path.join(CONFIGS_FOLDER);
  const dbSchema: IProjectDatabase = fse.readJSONSync(dbConfigPath);

  // @ts-expect-error the keys are known beforehand.
  const dbTables = Object.entries<ISchema>(dbSchema.schemas).reduce<
    DatabaseTable[]
  >((dbTables, [schemaName, schema]) => {
    // @ts-expect-error the keys are known beforehand.
    Object.entries<string>(schema).forEach(([tableName, desciption]) => {
      if (schemaName === "public" && tableName === migrationsTable) {
        return;
      }

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

  console.log(
    `These database tables are going to be reset:\n\n${dbList.join("\n")}\n`
  );
  const query = `
    TRUNCATE TABLE ${dbTables.join(", ")} RESTART IDENTITY CASCADE
  `;

  await db.none(query);
  console.log(`These database tables got reset:\n\n${dbList.join("\n")}\n`);
  console.log("Finished database reset.");
}

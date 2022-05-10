import fse from "fs-extra";
import path from "path";
import { CONFIGS_FOLDER } from "#environment/constants";
import { getDB } from "#database";

import type { IProjectDatabase, ISchema } from "#codegen/schema/interfaces";
import type { DatabaseTable } from "../types";

export async function resetDB() {
  try {
    await cleanDatabase();
  } catch (error) {
    console.error("Aborting database reset due to error:\n", error);
  }
}

/**
 * 
 */
async function cleanDatabase() {
  const { db } = getDB();

  console.log("Starting database reset.");

  const migrationsTable = "pgmigrations";

  const dbConfigPath = path.join(CONFIGS_FOLDER, "database.json");
  const dbConfig: IProjectDatabase = fse.readJSONSync(dbConfigPath);

  // @ts-expect-error the keys are known beforehand.
  const dbTables = Object.entries<ISchema>(dbConfig.schemas).reduce<
    DatabaseTable[]
  >((dbTables, [schemaName, schema]) => {
    Object.entries<string>(schema.tables).forEach(([tableName, desciption]) => {
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
  const tableNames = dbTables.map<string>(({ schema, table }) => {
    return `${schema}.${table}`;
  });

  console.log(
    `These database tables are going to be reset:\n\n${dbList.join("\n")}\n`
  );
  const query = `
    TRUNCATE TABLE ${tableNames.join(", ")} RESTART IDENTITY CASCADE
  `;

  await db.none(query);
  console.log(`These database tables got reset:\n\n${dbList.join("\n")}\n`);
  console.log("Finished database reset.");
}

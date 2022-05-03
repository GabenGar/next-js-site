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
  console.log("Starting database cleanup.\n");

  const dbConfigPath = path.join(CONFIGS_FOLDER, "database.json");
  const dbConfig: IProjectDatabase = fse.readJSONSync(dbConfigPath);
  const defaultSchema = dbConfig.default_schema;

  const publicTables = Object.entries(
    // @ts-expect-error the keys are known beforehand.
    (dbConfig.schemas[defaultSchema] as ISchema).tables
  ).map<DatabaseTable>(([tableName, description]) => {
    return {
      schema: defaultSchema,
      table: tableName,
      description: description,
    };
  });
  // @ts-expect-error the keys are known beforehand.
  const schemas = Object.entries<ISchema>(dbConfig.schemas)
    .filter(([schemaName]) => schemaName !== defaultSchema)
    .map(([schemaName, schemaData]) => {
      return {
        name: schemaName,
        description: schemaData.description,
      };
    });

  const dbList = publicTables.map<string>(({ schema, table, description }) => {
    return `"${schema}.${table}" - ${description}`;
  });
  const publicList = publicTables.map(({ schema, table }) => {
    return `${schema}.${table}`;
  });
  const schemaList = schemas.map(({ name, description }) => {
    return `${name} - ${description}`;
  });
  const schemaNames = schemas.map(({ name }) => name);

  // @TODO: more configurable way
  const query = `
    DROP TABLE IF EXISTS ${publicList.join(", ")} CASCADE;
    DROP SCHEMA IF EXISTS ${schemaNames.join(", ")} CASCADE;
  `;
  console.log(
    `These schemas are going to be dropped: \n\n${schemaList.join("\n")}\n`,
    `These database tables are going to be dropped:\n\n${dbList.join("\n")}\n`
  );

  await db.none(query);

  console.log(
    `Dropped these schemas:\n\n${schemaList.join("\n")}\n`,
    `Dropped these tables:\n\n${dbList.join("\n")}\n`
  );
  console.log("Finished database cleanup.");
}

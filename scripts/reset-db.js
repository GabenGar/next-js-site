// @ts-check
import fse from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import pgLib from "pg-promise";

const envPath = path.join(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

/**
 * @typedef ProjectDatabase
 * @property {Record<string, string>} properties
 */

const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_URL = process.env.DATABASE_URL;
const IS_PRODUCTION = NODE_ENV === "production";

(async () => {
  try {
    await cleanDatabase();
  } catch (error) {
    console.error("Aborting database reset due to error:\n", error);
  }
})();

async function cleanDatabase() {
  if (IS_PRODUCTION) {
    console.log("Reset is started in production mode, aborting.");
    return;
  }

  console.log("Starting database reset.");

  const migrationsTable = "pgmigrations";
  const pgp = pgLib({});
  const db = pgp(DATABASE_URL);

  const schemaPath = path.join(process.cwd(), "schema", "database.schema.json");
  /**
   * @type {ProjectDatabase}
   */
  const dbSchema = fse.readJSONSync(schemaPath);
  const dbTables = Object.keys(dbSchema.properties).filter(
    (name) => name !== migrationsTable
  );
  console.log(
    `These database tables are going to be reset:\n${dbTables.join("\n")}`
  );
  const query = `
    TRUNCATE TABLE ${dbTables.join(", ")} RESTART IDENTITY CASCADE
  `;

  await db.none(query);
  console.log(`These database tables got reset:\n${dbTables.join("\n")}`);
  console.log("Finished database reset.");
}

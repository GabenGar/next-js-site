import fse from "fs-extra";
import path from "path";
import pgLib from "pg-promise";

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
    console.error("Aborting database cleanup due to error:\n", error);
  }
})();

async function cleanDatabase() {
  if (IS_PRODUCTION) {
    console.log("Cleanup isn't started in dev mode, aborting.");
    return;
  }
  console.log("Starting database cleanup.");

  const pgp = pgLib({});
  const db = pgp(DATABASE_URL);

  const schemaPath = path.join(process.cwd(), "schema", "database.schema.json");
  /**
   * @type {ProjectDatabase}
   */
  const dbSchema = fse.readJSONSync(schemaPath);
  const dbTables = Object.keys(dbSchema.properties);
  console.log(
    `These database tables are going to be purged:\n${dbTables.join("\n")}`
  );
  const query = `
    DROP TABLE IF EXISTS ${dbTables.join(", ")} CASCADE
  `;

  await db.none(query);
  console.log(`Removed these tables:\n${dbTables.join("\n")}`);
  console.log("Finished database cleanup.");
}

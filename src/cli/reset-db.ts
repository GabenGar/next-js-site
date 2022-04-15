import fse from "fs-extra";
import path from "path";
import pgLib from "pg-promise";


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

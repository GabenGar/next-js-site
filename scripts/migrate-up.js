// @ts-check
const path = require("path");
const dotenv = require("dotenv");
const { default: pgMigrate } = require("node-pg-migrate");

const envPath = path.join(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_URL = process.env.DATABASE_URL;
const IS_DEVELOPMENT = NODE_ENV === "development";
const migrationsPath = path.join(
  process.cwd(),
  "src",
  "database",
  "migrations"
);

(async () => {
  const migrations = await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: migrationsPath,
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: IS_DEVELOPMENT
  });
  
})();

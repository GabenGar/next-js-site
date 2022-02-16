---
title: "PostgreSQL and NextJS (Part 1)"
created_at: "2022-02-14T18:28:57.395Z"
edited_at: null
author: "Gabengar"
---
How to run PostgreSQL on NextJS (almost) painlessly.
---
# PostgreSQL and NextJS (Part 1)

## Table of contents

1. [Abstract](#abstract)
2. [Installation](#installation)
3. [Migrations](#migrations)

## Abstract

Apparently there is no plug-n-play package for installing PostgeSQL (without ORM at least). So installation will involve several packages instead.

## Installation

PostgreSQL is assumed to be installed and the database is created.

## Migrations

Due to serverless nature of NextJS there is no "entry point" where you could run the migrations semi-synchronously. However, since we are not using ORM, migrations only happen through the migration files in the repo i.e. between commits and thus we'll have a separate script which will run them before the build.
The path for migration files is assumed to be `src/database/migrations`.

1. First off add the script to `package.json`:

   ```json
   "scripts": {
     // ...
     "migrate": "node scripts/migrate-up.js"
   }
   ```

Using a separate js module because we are going to use the API provided by `node-pg-migrate` instead of CLI. That will reduce friction between dev and prod setup for he repo.

2. Install needed packages and create the module at `scripts/migrate-up.js`:

   ```sh
   npm install node-pg-migrate
   npm install --save-dev dotenv
   ```

3. Create `package.json` in `scripts` folder with this content:

   ```json
   {
     "type": "module"
   }
   ```

This will run the files as node ESM files.
The reason for doing this way because ESM support in next is experimental as of 2022-02-16 so setting this value on the root `package.json` might bring problems you might not want to deal with while setting up a database flow.
The reason for not using typescript is it will either require an implicit knowledge of NextJS output files or `typescript`/`ts-node` in the prod dependancies.

4. Declare constants of the module:

   ```js
   import { createRequire } from "module";
   import path from "path";
   import dotenv from "dotenv";
   const require = createRequire(import.meta.url);
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
   ```

The hacky way the `node-pg-migrate` gets imported is because it [doesn't look like it works with node ESM system and so legacy `require` is invoked instead](https://github.com/salsita/node-pg-migrate/issues/648#issuecomment-666016411).

5. Invoke migration script:

   ```js
   (async () => {
     const migrations = await pgMigrate({
       databaseUrl: DATABASE_URL,
       dir: migrationsPath,
       direction: "up",
       migrationsTable: "pgmigrations",
       verbose: IS_DEVELOPMENT,
     });
   })();
   ```

Node 14+ versions can `await` at the module level without wrapping in an async IIFE.

6. Write your first migration file where `{migration_name}` is the name of migration:

   ```sh
   npx node-pg-migrate create {migration_name} \
      --migrations-dir src/database/migrations \
      --migration-filename-format utc \
      --migration-file-language sql
   ```

`npx` is like npm but it runs the package from the closest `node_modules` folder. Using `.sql` files juыt so we wouldn't need to learn the transformation syntax of `node-pg-migrate`.

7. Populate yor first migration file:

   ```sql
   -- Up Migration
   CREATE TABLE accounts (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE
   )
   ;
   -- Down Migration
   ```

8. Run the migration:
   ```sh
   npm run migrate
   ```

9. Now we have fist table set up and some basic migration workflow in place.
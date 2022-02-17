---
title: "PostgreSQL and NextJS (Part 2)"
created_at: "2022-02-17T14:06:03.295Z"
edited_at: null
author: "Gabengar"
---

## PostgreSQL integration for the NextJS poject.

# PostgreSQL and NextJS (Part 2)

## Abstract

Because NextJS is serverless, the package responsible for managing DB interaction, `pg-promise`, will have to work slightly differently.

## File structure

Since we are not using ORM, the main interactions with DB will happen through SQL statements, which is its own language. In order not to pollute the code base with SQL string literals, limit their declaration within a single module/folder. In case of this article they will be limited to `src/database`.

## Preparation

1. Install `pg-promise`:

   ```sh
   npm install pg-promise
   ```

2. Create a helper function which allows to work this package with NextJS, as per [the post by the package author (**UPDATE-2**)](https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise/34427278#34427278) let's say in `src/lib/util.ts`:

   ```ts
   export function createSingleton<T>(name: string, create: () => T): T {
     const s = Symbol.for(name);
     let scope = (global as any)[s];
     if (!scope) {
       scope = { ...create() };
       (global as any)[s] = scope;
     }
     return scope;
   }
   ```

3. Create a `lib.ts` file inside `src/database` and populate it like this:

   ```ts
   import path from "path";
   import pgLib from "pg-promise";

   import { createSingleton } from "../lib/util";

   import type { IInitOptions, IDatabase, IMain } from "pg-promise";

   interface IDatabaseScope {
     db: IDatabase<any>;
     pgp: IMain;
   }

   const initOptions: IInitOptions = {};
   const pgp = pgLib(initOptions);

   export function getDB(): IDatabaseScope {
     return createSingleton<IDatabaseScope>("db-scope", () => {
       return {
         db: pgp(process.env.DATABASE_URL),
         pgp,
       };
     });
   }
   ```
  
Use `getDB()` at the module scope which is going to have DB query functions. 

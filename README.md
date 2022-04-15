# Gabengars

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Develop](#develop)
4. [Build](#build)
5. [Database](#database)
6. [TODOs](#todos)

## Requirements

NodeJS - 12.20+
PostgreSQL - 10+

## Installation

Clone repo:

```sh
git clone https://github.com/GabenGar/next-js-site.git
cd next-js-site
npm install
```

Create .env file and set the values:

```sh
npm run env
```

`SECRET_KEY` can be generated by:

```
openssl rand -base64 32
```

## Develop

Run the dev setup:

```sh
npm run dev
```

## Build

```sh
npm run build
```

The result will be inside `.next` folder.

## Database

Dont's: https://wiki.postgresql.org/wiki/Don't_Do_This

### Create migration file:

```sh
npx node-pg-migrate create {migration_name} --migrations-dir src/database/migrations --migration-filename-format utc --migration-file-language sql
```

### Clean database:

```sh
npm run clean
```

This drops all project tables, including migrations ones.

### Reset database:

```sh
npm run reset
```

This truncates all non-migration project tables.

## MISC

Bind the specific ssh key to the git repo, courtesy of [github comment](https://gist.github.com/rbialek/1012262?permalink_comment_id=3730916#gistcomment-3730916):

```sh
git config core.sshCommand "ssh -i ~/.ssh/id_rsa_file -F /dev/null"
```

## TODOs

- figure out the problem between typescript, `ts-node` and `stringify-object` being a pure ESM package
- one-button validation interface
- prettier validation errors
- fix `$ref` parsing inconsistencies between `json-schema-to-typescript` and `ajv`
- fix `useSWR` fetching account info when not needed.
- scripts relying on `config.json.schema` to work with ref schemas
- make `pgFormatter` extenstion to work
- integrate nextJS middlewares
- locale-specific date formatting
- pre-deploy validation
- update dependencies
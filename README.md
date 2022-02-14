# Gabengars

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

```sh
npm run dev
```

## Build

```sh
npm run build
```

The result will be inside `.next` folder.

## Database
Create migration:
```sh
npx node-pg-migrate create {migration_name} --migrations-dir src/database/migrations --migration-filename-format utc --migration-file-language sql
```

## MISC
`scripts` folder is using CJS because ESM support in NextJS is experimental.

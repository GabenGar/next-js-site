import { initEnvVars } from "#lib/util";

const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE;
const REPOSITORY = process.env.NEXT_PUBLIC_REPOSITORY;
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN;

export const ENV_VARS = initEnvVars({
  NODE_ENV,
  SITE_TITLE,
  REPOSITORY,
  SITE_ORIGIN,
});

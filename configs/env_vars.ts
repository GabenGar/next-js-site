import { initEnvVars } from "#lib/util";

const NODE_ENV = process.env.NODE_ENV;

export const ENV_VARS = initEnvVars({
  NODE_ENV,
});

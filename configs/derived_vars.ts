import { ENV_VARS } from "./env_vars";

const IS_DEVELOPMENT = ENV_VARS.NODE_ENV === "development";

export const DERIVED_VARS = {
  IS_DEVELOPMENT
}

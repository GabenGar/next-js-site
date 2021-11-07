const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE;

export const ENV_VARS = {
  NODE_ENV,
  SITE_TITLE,
};

Object.freeze(ENV_VARS);

import {
  NODE_ENV,
  IS_INVITE_ONLY_String,
  IS_PUBLIC_String,
  SITE_NAME,
  SITE_ORIGIN,
} from "./vars";

export const IS_DEVELOPMENT = NODE_ENV === "development";

export const IS_INVITE_ONLY: boolean = JSON.parse(IS_INVITE_ONLY_String);
export const IS_PUBLIC: boolean = JSON.parse(IS_PUBLIC_String);

export const SESSION_COOKIE = `${SITE_NAME}_cookie_cutter`;
export const SITE_ORIGIN_URL = new URL(SITE_ORIGIN);

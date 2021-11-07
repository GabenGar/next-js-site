import { ENV_VARS } from "#configs/public";
export { fancyFetch } from "./fancy-fetch";

export function siteTitle(text: string) {
  return `${text} | ${ENV_VARS.SITE_TITLE}`;
}

import { ENV_VARS } from "#configs/public";
export { fancyFetch } from "./fancy-fetch";
export { buttonClicked } from "./dom";
export {
  transformChildrenProps,
  getValidChildren,
  useClassList,
} from "./react";

export function siteTitle(text: string) {
  return `${text} | ${ENV_VARS.SITE_TITLE}`;
}

/**
 *
 * @link https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object#answer-59787784
 */
export function isObjectEmpty(obj: {} | undefined) {

  if (!obj) {
    return true;
  }

  for (const i in obj) {
    return false;
  }

  return true;
}

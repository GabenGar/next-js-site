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

export function debounce<A extends any[], F extends (...args: A) => any>(
  fnc: F,
  cooldown: number = 250
) {
  let debounceStart = Date.now();
  let isOnCooldown = false;

  return (...args: A) => {
    const timeDiff = Date.now() - debounceStart;

    if (timeDiff > cooldown) {
      isOnCooldown = false;
    }

    if (isOnCooldown) {
      return;
    }

    debounceStart = Date.now();
    isOnCooldown = true;
    fnc(...args);
  };
}

export function initEnvVars(obj: Record<string, string | undefined>) {
  const unset_values: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      unset_values.push(key);
    }
  }

  if (unset_values.length) {
    const keys_string = unset_values.map((key) => `"${key}"`).join(", ");

    throw Error(`These environment variables are not set: ${keys_string}`);
  }

  Object.freeze(obj);
  // TODO: fix it
  return obj as Record<string, string>;
}

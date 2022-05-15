import { SITE_NAME } from "#environment/vars";
import { toJSON } from "#lib/json";

export { buttonClicked } from "./dom";
export { transformChildrenProps, getValidChildren } from "./react";
export { createSingleton } from "./create-singleton";
export { guessLinkType } from "./guess-link-type";
export { sleep } from "./sleep";

export type { ILinkTypes } from "./guess-link-type";

export function siteTitle(text: string) {
  return `${text} | ${SITE_NAME}`;
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

export function createRange(length: number, step = 1): number[] {
  const rangeLength = Math.ceil(length / step);
  const range = Array.from(new Array(rangeLength).keys()).map(
    (value) => value + step
  );

  return range;
}

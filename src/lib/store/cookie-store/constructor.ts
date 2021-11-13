import { DERIVED_VARS } from "#configs/public";
import { cookieKeys } from "./base";
import { parseCookie, saveCookie } from "./parse";
import type { CookieStore, ParsedCookie } from "./types";

let cookie: ParsedCookie;

export function init() {
  cookie = parseCookie(document.cookie);
  const isSecureKeyPresent = Array.from(cookie.keys()).find(
    (key) => key === cookieKeys.secure
  );

  if (!isSecureKeyPresent) {
    cookie.set(cookieKeys.secure, undefined);
    saveCookie(cookie);
  }

  window.addEventListener("beforeunload", () => {
    saveCookie(cookie);
  });
}

export function createCookieStore(key: string): CookieStore {
  // @ts-ignore
  if (!cookieKeys[key]) {
    if (DERIVED_VARS.IS_DEVELOPMENT) {
      throw new Error(
        `The cookie key "${key}" is not present in the list of allowed keys. Add the entry to the \`cookie-store\` module to make it work.`
      );
    } else {
      throw new Error(
        `The cookie key "${key}" is not present in the list of allowed keys.`
      );
    }
  }

  return {
    get: getValue(key),
    set: setValue(key),
  };
}

function getValue(key: string) {
  return () => {
    return cookie.get(key);
  };
}

function setValue(key: string) {
  return (value: string) => {
    saveCookie(cookie.set(key, value));
    return true;
  };
}

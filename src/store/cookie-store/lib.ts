import Cookies from "js-cookie";
import { fromJSON, toJSON } from "#lib/json";
import { StoreError } from "#lib/errors";

import type { CookieAttributes } from "js-cookie";

/**
 * Only includes client-accessible cookies.
 */
const cookieKeys = ["NEXT_LOCALE"] as const;
type ICookieKey = typeof cookieKeys[number];

const defaultOptions: CookieAttributes = {
  expires: 365,
  secure: true,
  sameSite: "strict",
};

export function getCookie(name: ICookieKey): string {
  const value = Cookies.get(name);

  if (!value) {
    throw new StoreError(
      "cookie",
      `Failed to get value for the key "${name}".`
    );
  }

  return value;
}

/**
 * @param options {@link CookieAttributes cookie options}. Uses {@link defaultOptions default options} if not passed. Partial options get merged with the defaults.}
 */
export function setCookie(
  name: ICookieKey,
  value: string,
  options: CookieAttributes = defaultOptions
) {
  const finalOptions = options
    ? { ...defaultOptions, ...options }
    : defaultOptions;
  const result = Cookies.set(name, value, finalOptions);

  if (!result) {
    throw new StoreError(
      "cookie",
      `Failed to set the value for the key "${name}"`
    );
  }
}

import type { ParsedCookie } from "./types";

export function saveCookie(parsedCookie: ParsedCookie) {
  document.cookie = unparseCookie(parsedCookie);
}

export function parseCookie(cookie: string): ParsedCookie {
  const parsedCookie = new Map<string, string | undefined>();

  // cookie is empty
  if (!cookie) {
    return parsedCookie;
  }

  cookie
    .split(";")
    .reduce(
      (result, currentKey) => result.set(...parseKey(currentKey)),
      parsedCookie
    );

  return parsedCookie;
}

function parseKey(key: string): [string, string | undefined] {
  const parsedPair = key.trim().split("=");
  const parsedValue = parsedPair.length !== 1 ? parsedPair[1] : undefined;

  return [parsedPair[0], parsedValue];
}

function unparseCookie(parsedCookie: ParsedCookie) {
  let cookieString = "";

  parsedCookie.forEach((value, key) => {
    cookieString += !value ? `${key}; ` : `${key}=${value}; `;
  });

  return cookieString;
}

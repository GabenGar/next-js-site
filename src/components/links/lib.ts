import { SITE_ORIGIN } from "#environment/vars";
import type { ILinkTypes } from "./types";

/**
 * Guess the link type from provided url.
 * @param url
 */
export function guessLinkType(url: string | URL): {
  parsedUrl: string;
  type: ILinkTypes;
} {
  let parsedUrl: string;
  let type: ILinkTypes;

  if (url instanceof URL) {
    type = guessURLType(url);
    url.searchParams.sort();
    parsedUrl = url.toString();
  } else {
    type = guessURLStringType(url);
    parsedUrl = url;
  }

  return { parsedUrl, type };
}

function guessURLStringType(url: string): ILinkTypes {
  if (url.startsWith("#")) {
    return "local";
  }

  return guessURLType(new URL(url));
}

/**
 * No check for `"local"` because they are not valid strings
 * for URL constructor
 * @param url
 */
function guessURLType(url: URL): ILinkTypes {
  if (url.protocol === "mailto:") {
    return "email";
  }

  if (url.origin === SITE_ORIGIN) {
    return "internal";
  }

  return "external";
}

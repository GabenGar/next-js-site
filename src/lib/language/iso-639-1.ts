import iso6391 from "iso-639-1";

import type { ISOLangString } from "./types";

export function getLangName(langStr: ISOLangString, isNative: boolean = false) {
  const name = isNative
    ? iso6391.getNativeName(langStr)
    : iso6391.getName(langStr);
  return name;
}

export function isISOLangString(str: string) {
  return iso6391.validate(str);
}

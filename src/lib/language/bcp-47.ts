import { parse, stringify } from "bcp-47";

import type { BCPLangTag, LangTagSchema } from "./types";

export function parseLangTag(langTag: BCPLangTag): LangTagSchema {
  return parse(langTag);
}

/**
 * Create `BCPLangTag` out of provided object.
 */
export function getLangTag(schema: LangTagSchema) {
  return stringify(schema);
}

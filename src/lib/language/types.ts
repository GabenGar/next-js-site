export type { Schema as LangTagSchema } from "bcp-47";
/**
 * In most cases looks like `{langCode}-{regionCode}`
 * where `langCode` is ISO 639-1 string
 * and `regionCode` is ISO 3166-1 string
 * @link https://stackoverflow.com/a/13269204/14481500
 */
export type BCPLangTag = string;
/**
 * ISO 639-1 string.
 */
export type ISOLangString = string;

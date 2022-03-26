export type { Schema as LangTagSchema } from "bcp-47";
/**
 * At minimum it looks like `{ISOLangString}-{ISORegionString}`
 * @link https://stackoverflow.com/a/13269204/14481500
 */
export type BCPLangTag = string;
/**
 * ISO 639-1 string.
 */
export type ISOLangString = string;
/**
 * ISO 3166-1 string.
 */
export type ISORegionString = string

import type { SSRConfig } from "next-i18next";
import type { ErrorObject } from "ajv";
import type { ISOLangString } from "#lib/language";
import type { ILocaleInfo } from "#lib/language";

export interface ISchemaValidationError extends ErrorObject {}

export type IValidationResult<T> =
  | { isValid: true; formattedResult: T }
  | { isValid: false; schemaValidationErrors: ISchemaValidationError[] };

/**
 * Props shared across all pages.
 */
export interface BasePageProps extends SSRConfig, Record<string, unknown> {
  /**
   * This info has to be passed to generate links server-side.
   */
  localeInfo: {
    locale: ISOLangString;
    defaultLocale: ISOLangString;
  };
  errors?: Array<string>;
  schemaValidationErrors?: ISchemaValidationError[];
}

/**
 * Locale info is handled by the decorator.
 */
export interface ILocalizedProps extends Omit<BasePageProps, "localeInfo" | "_nextI18Next"> {
  localeInfo?: ILocaleInfo;
}

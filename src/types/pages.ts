import type { SSRConfig } from "next-i18next";
import type { ErrorObject } from "ajv";
import type { ISOLangString } from "#lib/language";

export interface ISchemaValidationError extends ErrorObject {}

export type IValidationResult<T> =
  | { isValid: true; formattedResult: T }
  | { isValid: false; schemaValidationErrors: ISchemaValidationError[] };

/**
 * Props shared across all pages.
 * @TODOs
 * - Implement cookie-based theme.
 */
export interface BasePageProps extends Record<string, unknown>, SSRConfig {
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

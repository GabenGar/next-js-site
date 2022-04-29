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
 * - pass locale and default locale in all pages.
 */
export interface BasePageProps extends Record<string, unknown> {
  /**
   * This info has to be passed to generate links server-side.
   */
  localeInfo: {
    locale: ISOLangString;
    defaultLocale: ISOLangString;
  };
  theme?: string;
  errors?: Array<string>;
  schemaValidationErrors?: ISchemaValidationError[];
}

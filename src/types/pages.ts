import type { ErrorObject } from "ajv";
import type { SSRConfig } from "next-i18next";
export interface ISchemaValidationError extends ErrorObject {}

export type IValidationResult<T> =
  | { isValid: true; formattedResult: T }
  | { isValid: false; schemaValidationErrors: ISchemaValidationError[] };

/**
 * Props shared across all pages.
 * @TODO Implement cookie-based theme.
 */
export interface BasePageProps extends Record<string, unknown> {
  theme?: string;
  errors?: Array<string>;
  schemaValidationErrors?: ISchemaValidationError[];
}

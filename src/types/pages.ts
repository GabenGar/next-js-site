import type { SSRConfig } from "next-i18next";
import type { ErrorObject } from "ajv";
import type { ISOLangString } from "#lib/language";
import type { ILocaleInfo } from "#lib/language";

export interface ISchemaValidationError extends ErrorObject {}

export type IValidationResult<T> =
  | { isValid: true; formattedResult: T }
  | { isValid: false; schemaValidationErrors: ISchemaValidationError[] };

export interface IPageOptions {
  /**
   * Extra translation namespaces to be used by the page.
   */
  extraLangNamespaces: string[];
}

/**
 * Props shared across all pages.
 */
export type BasePageProps<ExtraProps = unknown> = ExtraProps &
  SSRConfig & {
    /**
     * This info has to be passed to generate links server-side.
     */
    localeInfo: {
      locale: ISOLangString;
      defaultLocale: ISOLangString;
    };
    errors?: Array<string>;
    schemaValidationErrors?: ISchemaValidationError[];
  };

export type ISlimProps<Props> = Props &
  Omit<Props, "localeInfo" | "_nextI18Next"> & {
    localeInfo?: ILocaleInfo;
    _nextI18Next?: SSRConfig[keyof SSRConfig];
  };

import { toJSON } from "#lib/json";
import type { ErrorObject } from "ajv";

/**
 * Project-specific error.
 * All procedures within this codebase throw this error
 * or its derivatives
 * after they've handled all other domain-specific errors.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 */
export class ProjectError extends Error {
  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    // @ts-expect-error
    super(message, options, ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProjectError);
    }
  }
}

export class ConfigurationError extends ProjectError {}

export class NotImplementedError extends ProjectError {}

/**
 * Account authentification errors.
 */
export class AuthError extends ProjectError {}

/**
 * JSON schema validation errors.
 */
export class FieldsValidationError extends ProjectError {
  constructor(validationErrors: ErrorObject[], ...params: any[]) {
    super(...params);
    this.message = toJSON<ErrorObject[]>(validationErrors);
  }
}

export class DatabaseError extends ProjectError {}

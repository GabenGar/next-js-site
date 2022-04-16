import type { ErrorObject } from "ajv";
import { toJSON } from "#lib/json";

/**
 * Project-specific error.
 * All procedures within this codebase throw this error
 * or its derivatives
 * after they've handled all other domain-specific errors.
 */
export class ProjectError extends Error {}

export class ConfigurationError extends ProjectError {}

/**
 * Account authentification errors.
 */
export class AuthError extends ProjectError {}

/**
 * JSON schema validation errors.
 */
export class FieldsValidationError extends ProjectError {
  constructor(validationErrors: ErrorObject[]) {
    super();
    this.message = toJSON<ErrorObject[]>(validationErrors);
  }
}

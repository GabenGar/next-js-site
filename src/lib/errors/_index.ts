import { toJSON } from "#lib/json";
import type { ErrorObject } from "ajv";

interface ErrorOptions {
  cause?: Error;
}

/**
 * Project-specific error.
 * All procedures within this codebase throw this error
 * or its derivatives
 * after they've handled all other domain-specific errors.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 */
export class ProjectError extends Error {
  // not using `ErrorOptions` because it crashes on build
  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    // @ts-expect-error some params thing
    super(message, options, ...(params as any));
    this.name = "ProjectError";
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ConfigurationError extends ProjectError {
  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    super(message, options, ...params);
    this.name = "ConfigurationError";
  }
}

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
    const message = toJSON<ErrorObject[]>(validationErrors);
    super(message, ...params);
    this.name = "FieldsValidationError";
  }
}

export class DatabaseError extends ProjectError {}

export class FetchError extends ProjectError {}

/**
 * @TODO: crash when created in client environment
 */
export class ServerError extends ProjectError {}

export class CodegenError extends ServerError {}

/**
 * @TODO: crash when created in server environment
 */
export class ClientError extends ProjectError {}

export class StoreError extends ClientError {}
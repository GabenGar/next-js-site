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
  name = "ProjectError";

  // not using `ErrorOptions` because it crashes on build
  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    // @ts-expect-error some params thing
    super(message, options, ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ConfigurationError extends ProjectError {
  name = "ConfigurationError";

  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    super(message, options, ...params);
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
  validationErrors: ErrorObject[];

  name = "FieldsValidationError";

  constructor(validationErrors: ErrorObject[], ...params: any[]) {
    super(...params);
    this.message = toJSON<ErrorObject[]>(validationErrors);
    this.validationErrors = validationErrors;
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

const storeTypes = ["localStorage", "redux"] as const;
type IStoreType = typeof storeTypes[number];

export class StoreError extends ClientError {
  type: IStoreType;

  name = "StoreError";

  constructor(
    type: IStoreType,
    message?: string,
    options?: ErrorOptions,
    ...params: any[]
  ) {
    super("", options, ...params);
    this.message = [`${type}:`, message].join("\n");
    this.type = type;
  }
}

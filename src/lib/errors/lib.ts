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
  // name = "ProjectError";

  // not using `ErrorOptions` because it crashes on build
  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    // @ts-expect-error some params thing
    super(message, options, ...params);
    // assign the name of the class
    this.name = this.constructor.name;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ConfigurationError extends ProjectError {
  // name = "ConfigurationError";

  constructor(message?: string, options?: ErrorOptions, ...params: any[]) {
    super(message, options, ...params);
  }
}

export class NotImplementedError extends ProjectError {
  featureName: string;

  // name = "NotImplementedError";

  constructor(featureName: string, options?: ErrorOptions, ...params: any[]) {
    const message = `Feature "${featureName}" is not implemented.`;
    super(message, options, ...params);
    this.featureName = featureName;
  }
}

/**
 * Account authentification errors.
 */
export class AuthError extends ProjectError {
  // name = "AuthError";
}

export class SessionError extends AuthError {}
export class AdminError extends AuthError {}

/**
 * JSON schema validation errors.
 */
export class FieldsValidationError extends ProjectError {
  validationErrors: ErrorObject[];

  // name = "FieldsValidationError";

  constructor(
    validationErrors: ErrorObject[],
    inputData?: unknown,
    ...params: any[]
  ) {
    const message = [
      toJSON<ErrorObject[]>(validationErrors),
      inputData && `Input Data: ${toJSON(inputData)}`,
    ].join("\n");
    super(message, ...params);
    this.validationErrors = validationErrors;
  }
}

/**
 * @TODO: crash when created in server environment
 */
export class ClientError extends ProjectError {}

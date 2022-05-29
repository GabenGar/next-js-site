import { IS_BROWSER } from "#environment/constants";
import { ConfigurationError, ProjectError } from "#lib/errors";

/**
 * The baseline error for all server errors.
 */
export class ServerError extends ProjectError {
  constructor(...args: ConstructorParameters<typeof ProjectError>) {
    super(...args);

    if (IS_BROWSER) {
      throw new ConfigurationError(
        `The server error "${this.name}" was called in the client context. Error information will not be passed.`
      );
    }
  }
}

export class DatabaseError extends ServerError {}

export class CodegenError extends ServerError {}

/**
 * Storage-related errors.
 */
export class StorageError extends ServerError {}
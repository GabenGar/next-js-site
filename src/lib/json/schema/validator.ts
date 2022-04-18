import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";
import { ConfigurationError } from "#lib/errors";

import type { SchemaObject, ErrorObject, ValidateFunction } from "ajv";
import type { OperationResult } from "#types/util";

export type ValidationResult<Schema> =
  | ValidationSuccess<Schema>
  | ValidationFailure;

export interface ValidationSuccess<Schema> extends OperationResult<true> {
  data: Schema;
}

export interface ValidationFailure extends OperationResult<false> {
  errors: ErrorObject[];
}

const ajv = initAJV();

function initAJV() {
  try {
    const ajv = new Ajv({
      meta: metaSchema,
      schemas: schemaMap,
      coerceTypes: true,
    });

    addFormats(ajv);

    return ajv;
  } catch (error) {
    if (error instanceof Error) {
      throw new ConfigurationError(`AJV - ${error.message}}`, {
        cause: error,
      });
    }

    throw error;
  }
}

export function createValidator<Schema = unknown>(schema: SchemaObject) {
  if (!schema.$id) {
    throw new ConfigurationError(
      `Schema "${schema}" doesn't have an "$id" property.`
    );
  }

  // forcing the type because schemas do not use `$async` keyword
  const validate = ajv.getSchema<Schema>(schema.$id) as
    | ValidateFunction<Schema>
    | undefined;

  if (!validate) {
    throw new ConfigurationError(
      `Schema with id "${schema.$id}" doesn't exist.`
    );
  }

  return async <InputType = unknown>(
    inputData: InputType
  ): Promise<ValidationResult<Schema>> => {
    let result = validate(inputData);

    // @TODO: throwing logic
    if (!result) {
      return {
        is_successful: false,
        // doing a copy as per ajv instructions
        errors: [...validate.errors!],
      };
    }

    return {
      is_successful: true,
      data: inputData as unknown as Schema,
    };
  };
}

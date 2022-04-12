import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";

import type { SchemaObject, ErrorObject } from "ajv";

export type ValidationResult<Schema extends SchemaObject> = ValidationSuccess<Schema> | ValidationFailure

export interface ValidationSuccess<Schema extends SchemaObject> {
  is_successfull: true,
  data: Schema
}

export interface ValidationFailure<> {
  is_successfull: false,
  errors: ErrorObject[]
}


const ajv = new Ajv({
  meta: metaSchema,
  schemas: schemaMap,
  coerceTypes: true,
});
addFormats(ajv);

export function createValidator<Schema extends SchemaObject>(
  schema: SchemaObject
) {
  const validate = ajv.getSchema<Schema>(schema.$id!)!;

  return async (inputData: unknown): Promise<ValidationResult<Schema>> => {
    const result = await validate(inputData);

    if (!result) {
      return {
        is_successfull: false,
        errors: [...validate.errors!]
      }
    }

    return result;
  };
}

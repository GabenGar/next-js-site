import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";

import type { SchemaObject, ErrorObject } from "ajv";

export type ValidationResult<Schema> =
  | ValidationSuccess<Schema>
  | ValidationFailure;

export interface ValidationSuccess<Schema> {
  is_successfull: true;
  data: Schema;
}

export interface ValidationFailure {
  is_successfull: false;
  errors: ErrorObject[];
}

const ajv = new Ajv({
  meta: metaSchema,
  schemas: schemaMap,
  coerceTypes: true,
});
addFormats(ajv);

export function createValidator<Schema>(schema: SchemaObject) {
  const validate = ajv.getSchema<Schema>(schema.$id!)!;

  return async (inputData: unknown): Promise<ValidationResult<Schema>> => {
    const result = await validate(inputData);

    if (!result) {
      return {
        is_successfull: false,
        // doing a copy as per ajv instructions
        errors: [...validate.errors!],
      };
    }

    return {
      is_successfull: true,
      data: result as Schema,
    };
  };
}

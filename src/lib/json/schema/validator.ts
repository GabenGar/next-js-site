import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";

import type { SchemaObject } from "ajv";

const ajv = new Ajv({
  meta: metaSchema,
  schemas: schemaMap
});
addFormats(ajv);

async function findSchema(schemaID: string) {
  return schemaMap[schemaID];
}

export function createValidator<Schema>(schema: SchemaObject) {
  return ajv.getSchema<Schema>(schema.$id!)!;
}

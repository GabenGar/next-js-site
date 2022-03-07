import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";

import type { SchemaObject } from "ajv";

const ajv = new Ajv({
  meta: metaSchema,
});
addFormats(ajv);

async function findSchema(schemaID: string) {
  return schemaMap[schemaID];
}

export function createValidator<Schema>(schemaID: string) {
  return ajv.getSchema<Schema>(schemaID);
}

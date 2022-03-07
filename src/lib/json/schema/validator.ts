import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";
import { schemaMap } from "#codegen/schema/map";

const ajv = new Ajv({
  meta: metaSchema,
  schemas: schemaMap
});
addFormats(ajv);

async function findSchema(schemaID: string) {
  return schemaMap[schemaID];
}

export function createValidator<Schema>(schemaID: string) {
  return ajv.getSchema<Schema>(schemaID)!;
}

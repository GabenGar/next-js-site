import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";

import type { SchemaObject } from "ajv";

const ajv = new Ajv({
  meta: metaSchema,
  loadSchema: async (uri) => {
    return {};
  },
});
addFormats(ajv);

export function createValidator(schema: SchemaObject) {
  return ajv.compile(schema)
}

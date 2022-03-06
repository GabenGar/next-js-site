import Ajv from "ajv";
import addFormats from "ajv-formats";
import metaSchema from "#schema/meta.schema.json";

export const schemaValidator = new Ajv({
  meta: metaSchema,
  loadSchema: async (uri) => {
    return {};
  },
});
addFormats(schemaValidator);

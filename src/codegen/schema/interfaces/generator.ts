import { SCHEMA_FOLDER } from "#environment/constants";
import { fromSchemaToInterface } from "#lib/json/schema";
import { schemaMap } from "#codegen/schema/map";

import type { SchemaObject } from "ajv";

async function generateInterfacesFromSchemas() {
  const interfaces: string[] = [];

  for await (const schema of Object.values(schemaMap)) {
    const schemaCopy = transformSchema(schema);

    // quick hack until I figure config schema out
    if (schema.$id === "http://schemas.com/database.schema.json") {
      const interfaceString = await fromSchemaToInterface(
        schemaCopy,
        schema.title,
        {
          bannerComment: "",
          cwd: SCHEMA_FOLDER,
          declareExternallyReferenced: true,
        }
      );

      interfaces.push(interfaceString);
      continue;
    }
    const interfaceString = await fromSchemaToInterface(
      schemaCopy,
      schema.title,
      {
        bannerComment: "",
        cwd: SCHEMA_FOLDER,
        declareExternallyReferenced: false,
      }
    );
    interfaces.push(interfaceString);
  }

  const content = interfaces.join("\n\n");

  return content;
}

/**
 * Doing this because the package mutates the schema object.
 *
 * @param schema
 */
function transformSchema(schema: SchemaObject) {
  const newSchema: typeof schema = { ...schema };
  changeRefs(newSchema);
  return newSchema;
}

/**
 * A ducttape for `ajv` and `json-schema-to-typescript`
 * parsing `$ref`s differently.
 */
function changeRefs(obj: Record<string, unknown>) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object") {
      changeRefs(value as Record<string, unknown>);
    }

    if (key === "$ref") {
      if (typeof value === "string" && value.startsWith("/")) {
        obj[key] = value.slice(1);
      }
    }
  }
}

export default generateInterfacesFromSchemas;

import { compile } from "json-schema-to-typescript";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { SCHEMA_FOLDER } from "#environment/constants";
import { schemaMap } from "#codegen/schema/map";

import type { JSONSchema, Options } from "json-schema-to-typescript";

import type { SchemaObject } from "ajv";

const parserOptions: Options["$refOptions"] = {
  resolve: {
    http: {
      async read(file) {
        return schemaMap[file.url];
      },
    },
  },
};

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
          format: false,
          declareExternallyReferenced: true,
          $refOptions: parserOptions,
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
        format: false,
        declareExternallyReferenced: false,
        $refOptions: parserOptions,
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
  // fixing some weird reference issue
  const newSchema: typeof schema = JSON.parse(JSON.stringify(schema));
  // changeRefs(newSchema);
  return newSchema;
}

export async function fromSchemaToInterface(
  schema: JSONSchema,
  name: string,
  options?: Partial<Options>
) {
  const interfaceString = await compile(schema, name, options);
  return interfaceString;
}

export default generateInterfacesFromSchemas;

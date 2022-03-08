import { SCHEMA_FOLDER } from "#environment/constants";
import { fromSchemaToInterface } from "#lib/json/schema";
import { schemaMap } from "#codegen/schema/map";

import type { JSONSchema } from "json-schema-to-typescript";

/**
 * @todo: fix `$ref` parsing
 */
async function generateInterfacesFromSchemas() {
  const interfaces: string[] = [];

  for await (const schema of Object.values(schemaMap)) {
    // doing this because the package mutates the schema object
    const schemaCopy: typeof schema = { ...schema };
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

export default generateInterfacesFromSchemas;

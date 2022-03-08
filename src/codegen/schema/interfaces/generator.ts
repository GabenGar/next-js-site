import { SCHEMA_FOLDER } from "#environment/constants";
import { reduceFolder, readJSON } from "#server/fs";
import { fromSchemaToInterface } from "#lib/json/schema";
import { schemaMap } from "#codegen/schema/map";

import type { JSONSchema } from "json-schema-to-typescript";

/**
 * @todo: fix `$ref` parsing
 */
async function generateInterfacesFromSchemas() {
  const interfaces: string[] = [];

  for await (const schema of Object.values(schemaMap)) {
    const interfaceString = await fromSchemaToInterface(schema, schema.title, {
      bannerComment: "",
      cwd: SCHEMA_FOLDER,
      declareExternallyReferenced: false,
      // $refOptions: {
      //   parse: {
      //     json: {
      //       parse: async (file) => {
      //         console.log("PARSE URL: ", file.url);
      //         return file.data
      //       }
      //     }
      //   },
      //   resolve: {
      //     file: {
      //       read: async (file) => {
      //         const schemaID: string = (file.data as JSONSchema).$id;
      //         console.log("ID: ", schemaID);

      //         return schemaMap[schemaID];
      //       },
      //     },
      //   },
      // },
    });
    interfaces.push(interfaceString);
  }

  const content = interfaces.join("\n\n");
  return content;
}

export default generateInterfacesFromSchemas;

import { SCHEMA_FOLDER } from "#environment/constants";
import { reduceFolder, readJSON } from "#server/fs";
import { fromSchemaToInterface } from "#lib/json/schema";

import type { JSONSchema } from "json-schema-to-typescript";

/**
 * @todo: fix `$ref` parsing
 */
async function generateInterfacesFromSchemas() {
  const interfaces = await reduceFolder<string[]>(
    SCHEMA_FOLDER,
    [],
    { isShallow: false },
    async (interfaces, folderItem) => {
      const { entry, entity } = folderItem;

      // meta-schema gets generated separately
      const isValidfile =
        entry.isFile() &&
        entity.ext === ".json" &&
        entity.name !== "meta.schema";

      if (!isValidfile) {
        return interfaces;
      }

      const schemaObj = await readJSON<JSONSchema>(folderItem.toString());

      // file-level schemas always have to have `title` property
      if (!schemaObj.title) {
        throw Error(
          `Schema at ${folderItem.toString()} is missing "title" attribue.`
        );
      }

      const interfaceString = await fromSchemaToInterface(
        schemaObj,
        schemaObj.title,
        {
          bannerComment: "",
          cwd: SCHEMA_FOLDER,
          declareExternallyReferenced: false,
        }
      );

      interfaces.push(interfaceString);
      return interfaces;
    }
  );

  const content = interfaces.join("\n\n");
  return content;
}

export default generateInterfacesFromSchemas;

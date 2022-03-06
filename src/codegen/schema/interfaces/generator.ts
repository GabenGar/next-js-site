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
        entity.name !== "_meta.schema";

      if (!isValidfile) {
        return interfaces;
      }

      const jsonObj = await readJSON<JSONSchema>(folderItem.toString());

      // file-level schemas always have to have `title` property
      if (!jsonObj.title) {
        throw Error(
          `Schema at ${folderItem.toString()} is missing "title" attribue.`
        );
      }

      const interfaceString = await fromSchemaToInterface(
        jsonObj,
        jsonObj.title,
        {
          bannerComment: "",
          cwd: SCHEMA_FOLDER,
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
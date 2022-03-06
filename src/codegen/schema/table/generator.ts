import { SCHEMA_FOLDER } from "#environment/constants";
import { getSchemaNames, isJSONSchema } from "#lib/json/schema";
import { FolderItem, readJSON, reduceFolder } from "#server/fs";

import type { SchemaObject } from "ajv";

interface IResult {
  imports: {
    symbolName: string;
    schemaID: string;
    /**
     * Relative to the `SCHEMA_FOLDER`.
     */
    folderItem: FolderItem;
  }[];
}

/**
 * Collect all schemas in `schema` folder
 * and assign them into hash table,
 * where its `$id` is the key
 * and the schema object is the value.
 */
async function generateSchemaTable() {
  const result = await reduceFolder<IResult>(
    SCHEMA_FOLDER,
    { imports: [] },
    { isShallow: false },
    async (result, folderItem) => {
      if (!isJSONSchema(folderItem)) {
        return result;
      }

      const schemaObj = await readJSON<SchemaObject>(folderItem.toString());
      const { objName, typeName } = getSchemaNames(schemaObj);

      result.imports.push({
        symbolName: objName,
        folderItem,
        schemaID: schemaObj.$id!,
      });

      return result;
    }
  );

  const jsonImports = result.imports.map(
    ({ folderItem, schemaID, symbolName }) => {
      return `import ${symbolName} from ${folderItem.toString()}`
    }
  ).join("\n");

  return jsonImports
}

export default generateSchemaTable;

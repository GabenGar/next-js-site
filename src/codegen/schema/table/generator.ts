import { SCHEMA_FOLDER } from "#environment/constants";
import { getSchemaNames, isJSONSchema } from "#lib/json/schema";
import { FolderItem, readJSON, reduceFolder } from "#server/fs";

import type { SchemaObject } from "ajv";
import stringifyObject from "stringify-object";

interface IResult {
  schemaMap: string[];
  imports: {
    symbolName: string;
    schemaID: string;
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
    { imports: [], schemaMap: [] },
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

      result.schemaMap.push(`"${schemaObj.$id!}": ${objName}`);

      return result;
    }
  );

  const topImports = `import { SchemaObject } from "ajv";`;
  const jsonImports = result.imports
    .map(({ folderItem, schemaID, symbolName }) => {
      const importPath = `#schema${schemaID}`;
      return `import ${symbolName} from "${importPath}";`;
    })
    .join("\n");

  const mapExport = `export const schemaMap: Record<string, SchemaObject> = {${result.schemaMap.join(
    ",\n"
  )}};\n`;

  const content = [topImports, jsonImports, mapExport].join("\n\n");

  return content;
}

export default generateSchemaTable;

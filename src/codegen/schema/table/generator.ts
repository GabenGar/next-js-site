import { SCHEMA_FOLDER } from "#environment/constants";
import { FolderItem, readJSON, reduceFolder } from "#server/fs";

import type { SchemaObject } from "ajv";
import type { JSONSchema } from "json-schema-to-typescript";
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
 * @todo fix recursive dependancy on validator codegen
 */
async function generateSchemaTable() {
  const result = await reduceFolder<IResult>(
    SCHEMA_FOLDER,
    { imports: [], schemaMap: [] },
    { isShallow: false },
    async (result, folderItem) => {
      if (
        !isJSONSchema(folderItem) ||
        // meta schema is excluded because it gets fed separately
        folderItem.entity.name === "meta.schema"
      ) {
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
      const importPath = `#schema/${schemaID}`;
      return `import ${symbolName} from "${importPath}";`;
    })
    .join("\n");

  const mapExport = `export const schemaMap: Record<string, SchemaObject> = {${result.schemaMap.join(
    ",\n"
  )}};\n`;

  const reExports = result.imports
    .map(({ symbolName }) => {
      return `export const ${symbolName}Schema = ${symbolName};`;
    })
    .join("\n");

  const content = [topImports, jsonImports, mapExport, reExports].join("\n\n");

  return content;
}

/**
 * @returns camelCased and PascalCased names
 */
export function getSchemaNames({ title }: JSONSchema): {
  objName: string;
  typeName: string;
} {
  const objName = `${title![0].toLowerCase()}${title!.slice(1)}`;
  const typeName = title!;

  return {
    objName,
    typeName,
  };
}

function isJSONSchema({ entity, entry }: FolderItem) {
  return (
    entry.isFile() &&
    entity.ext === ".json" &&
    entity.name.endsWith(".schema")
  );
}

export default generateSchemaTable;

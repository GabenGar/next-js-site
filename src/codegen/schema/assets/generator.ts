import { SCHEMA_FOLDER } from "#environment/constants";
import { FolderItem, readJSON, reduceFolder } from "#server/fs";

import type { SchemaObject } from "ajv";
import type { JSONSchema } from "json-schema-to-typescript";

interface IResult {
  schemaMap: string[];
  imports: {
    symbolName: string;
    schemaID: string;
  }[];
}

async function createSchemaImports() {
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
        schemaID: schemaObj.$id!,
      });

      result.schemaMap.push(`"${schemaObj.$id!}": ${objName}`);

      return result;
    }
  );

  const jsonImports = result.imports
    .map(({ schemaID, symbolName }) => {
      const idPath = schemaID.replace("http://example.com/schemas/", "");
      const importPath = `#schema/${idPath}`;
      return `export { default as ${symbolName}Schema} from "${importPath}";`;
    })
    .join("\n");
  const content = [jsonImports].join("\n\n");

  return content;
}

function isJSONSchema({ entity, entry }: FolderItem) {
  return (
    entry.isFile() && entity.ext === ".json" && entity.name.endsWith(".schema")
  );
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

export default createSchemaImports;

import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON, reduceFolder } from "#server/fs";
// quick fix for module conflict
import { getSchemaNames } from "./table/generator";

/**
 * Generated separately.
 */
const excludedSchema = "meta.schema.json";

async function generateSchemas() {
  const schemas = await getSchemas();
  const content = schemas.join("\n");
  return content;
}

async function getSchemas() {
  const schemas = await reduceFolder<string[]>(
    SCHEMA_FOLDER,
    [],
    { isShallow: false },
    async (schemas, folderItem) => {
      const { entry } = folderItem;

      if (!entry.isFile() || entry.name === excludedSchema) {
        return schemas;
      }

      const schemaObj: { title: string } = await readJSON(
        folderItem.toString()
      );
      const { objName, typeName } = getSchemaNames(schemaObj);
      const exportLine = `export const ${objName}Schema = `;
      const objString = stringifyObject(schemaObj, {});
      const constDeclaration = `as const;`;
      const derivativeType = `export type ${typeName}Schema = typeof ${objName}Schema;`;
      const finalObj = `${exportLine} ${objString} ${constDeclaration}\n\n${derivativeType}\n\n`;

      schemas.push(finalObj);
      return schemas;
    }
  );

  return schemas;
}

export default generateSchemas;

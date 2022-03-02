import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON, reduceFolder } from "#server/fs";

/**
 * Generated separately.
 */
const excludedSchema = "_meta.schema.json";

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
      const schemaName = `${schemaObj.title}Schema`;
      const exportLine = `export const ${schemaName} = `;
      const objString = stringifyObject(schemaObj, {});
      const constDeclaration = `as const;`;
      const derivativeType = `export type I${schemaName} = typeof ${schemaName};`;
      const finalObj = `${exportLine} ${objString} ${constDeclaration}\n\n${derivativeType}\n\n`;

      schemas.push(finalObj);
      return schemas;
    }
  );

  return schemas;
}

export default generateSchemas;

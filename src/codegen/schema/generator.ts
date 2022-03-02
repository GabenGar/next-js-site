import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON, reduceFolder } from "#server/fs";

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
      if (!entry.isFile()) {
        return schemas;
      }

      const schemaObj: { title: string } = await readJSON(
        folderItem.toString()
      );
      const exportLine = `export const ${schemaObj.title} = `;
      const objString = stringifyObject(schemaObj, {});
      const finalObj = `${exportLine} ${objString}\n`;

      schemas.push(finalObj);
      return schemas;
    }
  );

  return schemas;
}

export default generateSchemas;

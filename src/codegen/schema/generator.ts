import { SCHEMA_FOLDER } from "#environment/constants";
import { reduceFolder } from "#server/fs";


async function generateSchemas() {
  const schemas = await getSchemas();
  return "export interface IFuckYou {};";
}

async function getSchemas() {
  const schemas = await reduceFolder<string[]>(
    SCHEMA_FOLDER,
    [],
    { isShallow: false },
    async (schemas, folderItem) => {
      return schemas;
    }
  );

  return schemas;
}

export default generateSchemas;

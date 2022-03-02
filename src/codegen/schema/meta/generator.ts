import path from "path";
import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON } from "#server/fs";

async function generateMetaSchema() {
  const schemaPath = path.join(SCHEMA_FOLDER, "_meta.schema.json");
  const schemaObj: { title: string } = await readJSON(schemaPath);

  const exportLine = `export const ${schemaObj.title} = `;
  const objString = stringifyObject(schemaObj, {});
  const constDeclaration = `as const;`;
  const derivativeType = `export type I${schemaObj.title} = typeof ${schemaObj.title};`;
  const finalObj = `${exportLine} ${objString} ${constDeclaration}\n\n${derivativeType}`;

  return finalObj;
}

export default generateMetaSchema;

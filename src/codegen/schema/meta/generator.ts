import path from "path";
import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON } from "#server/fs";

async function generateMetaSchema() {
  const schemaPath = path.join(SCHEMA_FOLDER, "_meta.schema.json");
  const schemaObj: { title: string } = await readJSON(schemaPath);
  const schemaName = `${schemaObj.title}Schema`;
  const exportLine = `export const ${schemaName} = `;
  const objString = stringifyObject(schemaObj, {});

  const constDeclaration = `as const;`;
  const derivativeType = `export type I${schemaName} = typeof ${schemaName};`;
  const finalObj = `${exportLine} ${objString} ${constDeclaration}\n\n${derivativeType}`;

  return finalObj;
}

export default generateMetaSchema;

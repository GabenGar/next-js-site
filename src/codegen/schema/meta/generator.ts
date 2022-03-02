import path from "path";
import stringifyObject from "stringify-object";
import { compile } from "json-schema-to-typescript";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON } from "#server/fs";

import type { JSONSchema } from "json-schema-to-typescript";

async function generateMetaSchema() {
  const schemaPath = path.join(SCHEMA_FOLDER, "_meta.schema.json");
  
  const schemaObj: { title: string } = await readJSON(schemaPath);
  const schemaInterface = await compile(
    schemaObj as JSONSchema,
    schemaObj.title
  );


  const exportLine = `export const ${schemaObj.title} = `;
  const objString = stringifyObject(schemaObj, {});
  const constDeclaration = `as const;`;
  const finalObj = `${schemaInterface}\n\n${exportLine} ${objString} ${constDeclaration}\n\n`;

  return finalObj;
}

export default generateMetaSchema;

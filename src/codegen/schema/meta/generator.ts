import path from "path";
import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { readJSON } from "#server/fs";
import { fromSchemaToInterface, getSchemaNames } from "#lib/json/schema";

import type { JSONSchema } from "json-schema-to-typescript";

async function generateMetaSchema() {
  const schemaPath = path.join(SCHEMA_FOLDER, "meta.schema.json");

  const schemaObj: { title: string } = await readJSON(schemaPath);
  const schemaInterface = await fromSchemaToInterface(
    schemaObj as JSONSchema,
    schemaObj.title
  );
  const { objName, typeName } = getSchemaNames(schemaObj);
  const exportLine = `export const ${objName} = `;
  const objString = stringifyObject(schemaObj, {});
  const constDeclaration = `as const;`;
  const finalObj = `${schemaInterface}\n\n${exportLine} ${objString} ${constDeclaration}\n\n`;

  return finalObj;
}

export default generateMetaSchema;

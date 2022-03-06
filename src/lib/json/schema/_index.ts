export { createValidator } from "./validator";
export { ValidationErrors } from "./errors";
import { compile } from "json-schema-to-typescript";

import type { JSONSchema, Options } from "json-schema-to-typescript";
import type { FolderItem } from "#server/fs";

export function isJSONSchema({ entity, entry }: FolderItem) {
  return (
    entry.isFile() && entity.ext === ".json" && entity.name.endsWith(".schema")
  );
}

export async function fromSchemaToInterface(
  schema: JSONSchema,
  name: string,
  options?: Partial<Options>
) {
  const interfaceString = await compile(schema, name, options);
  return interfaceString;
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
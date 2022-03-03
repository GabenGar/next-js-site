import { compile } from "json-schema-to-typescript";

import type { JSONSchema, Options } from "json-schema-to-typescript";

export interface IJSONOptions {
  /**
   * @default true
   */
  isPretty?: boolean;
}

const defaultJSONOptions: IJSONOptions = {
  isPretty: true,
};

export function toJSON(value: any, options = { ...defaultJSONOptions }) {
  const finalOptions = options
    ? { ...defaultJSONOptions, ...options }
    : defaultJSONOptions;
  return JSON.stringify(
    value,
    undefined,
    finalOptions.isPretty ? 2 : undefined
  );
}
export function fromJSON<Type extends unknown>(
  json: string,
  options = defaultJSONOptions
): Type {
  const finalOptions = options
    ? { ...defaultJSONOptions, ...options }
    : defaultJSONOptions;
  return JSON.parse(json);
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

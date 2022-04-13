export { createValidator } from "./validator";
export { ValidationErrors } from "./errors";
export type { ValidationResult } from "./validator";
import { compile } from "json-schema-to-typescript";

import type { JSONSchema, Options } from "json-schema-to-typescript";

export async function fromSchemaToInterface(
  schema: JSONSchema,
  name: string,
  options?: Partial<Options>
) {
  const interfaceString = await compile(schema, name, options);
  return interfaceString;
}

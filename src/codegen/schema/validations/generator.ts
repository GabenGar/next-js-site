import { schemaMap } from "#codegen/schema/map";

import type { AnySchemaObject } from "ajv";

interface IResult {
  imports: string[];
  typeImports: string[];
  exports: string[];
  typeExports: string[];
}

/**
 * @todo Place imports at the top.
 */
async function generateValidations() {
  const schemaList = Object.values(schemaMap);
  const imports = [`import { createValidator } from "#lib/json/schema"`].join(
    "\n"
  );

  const result = schemaList.reduce<IResult>(
    (result, schema) => {
      const typeImport = `import type { I${schema.title} } from "#codegen/schema/interfaces";`;
      const content = `export const validate${schema.title}Fields = createValidator<I${schema.title}>("${schema.$id}")`;

      result.typeImports.push(typeImport);
      result.exports.push(content);

      return result;
    },
    { imports: [], typeImports: [], exports: [], typeExports: [] }
  );

  const content = [
    imports,
    result.typeImports.join("\n"),
    result.exports.join("\n"),
  ].join("\n\n");

  return content;
}

export default generateValidations;

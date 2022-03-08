import { schemaMap } from "#codegen/schema/map";
import { getSchemaNames } from "../map/generator";

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
      const { objName, typeName } = getSchemaNames(schema);
      const schemaImport = `${objName}Schema`;
      const typeImport = `I${schema.title}`;
      const content = `export const validate${schema.title}Fields = createValidator<${typeImport}>(${schemaImport})`;

      result.imports.push(schemaImport);
      result.typeImports.push(typeImport);
      result.exports.push(content);

      return result;
    },
    { imports: [], typeImports: [], exports: [], typeExports: [] }
  );

  const schemaImports = `import { ${result.imports.join(
    ", "
  )} } from "#codegen/schema/assets"`;
  const typeImports = `import type { ${result.typeImports.join(
    ", "
  )} } from "#codegen/schema/interfaces"`;

  const content = [
    imports,
    schemaImports,
    typeImports,
    result.exports.join("\n"),
  ].join("\n\n");

  return content;
}

export default generateValidations;

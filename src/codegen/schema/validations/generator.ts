import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { reduceFolder, readJSON } from "#server/fs";

import type { AnySchemaObject } from "ajv";

interface ICodegenPrep {
  /**
   * The base name of the generated code.
   * Most of the time it's `JSONSchema.title` value.
   */
  title: string;
  /**
   * Imports related to the generated code.
   */
  imports: string[];
  /**
   * Type imports related to the generated code.
   */
  typeImports: string[];
  /**
   * The content of the generated code.
   */
  content: string;
}

/**
 * @todo Place imports at the top.
 */
async function generateValidations() {
  const imports = `import { createValidator } from "#lib/json/schema"`;

  const validations = await reduceFolder<string[]>(
    SCHEMA_FOLDER,
    [],
    { isShallow: false },
    async (schemas, folderItem) => {
      const { entity, entry } = folderItem;
      const isValidFile =
        entry.isFile() &&
        entity.ext === ".json" &&
        entity.name !== "meta.schema";

      if (!isValidFile) {
        return schemas;
      }

      const schemaObj = await readJSON<AnySchemaObject>(folderItem.toString());
      const typeImport = `import { I${schemaObj.title} } from "#codegen/schema/interfaces";`;
      const content = `export const validate${
        schemaObj.title
      }Fields = createValidator<I${schemaObj.title}>(${stringifyObject(
        schemaObj
      )})`;

      const finalContent = [typeImport, content].join("\n");

      schemas.push(finalContent);

      return schemas;
    }
  );

  const content = validations.join("\n\n");

  return `${imports}\n${content}`;
}

export default generateValidations;

import stringifyObject from "stringify-object";
import { SCHEMA_FOLDER } from "#environment/constants";
import { schemaMap } from "#codegen/schema/map";
import { reduceFolder, readJSON } from "#server/fs";

import type { AnySchemaObject } from "ajv";

interface IResult {
  imports: string[]
  typeImports: string[]
  exports: string[]
  typeExports: string[]
}

/**
 * @todo Place imports at the top.
 */
async function generateValidations() {
  const imports = `import { createValidator } from "#lib/json/schema"`;

  const result = Object.values(schemaMap).reduce((schema) => {
    return schema;
  });


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
      const typeImport = `import type { I${schemaObj.title} } from "#codegen/schema/interfaces";`;
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

  return `${imports}\n\n${content}`;
}

export default generateValidations;

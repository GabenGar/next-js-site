import { CODEGEN_FOLDER } from "#environment/constants";
import { reduceFolder } from "#server/fs";
import { generateTypescriptCode } from "./typescript/_index";
import { excludedFolders, generatorFilename } from "./types";

(async () => {
  try {
    await analyzeCodegen(CODEGEN_FOLDER);
    await runCodegen(CODEGEN_FOLDER);
  } catch (error) {
    console.error(error);
    throw error;
  }
})();

/**
 * Analyzes the codegen folder.
 * @param codegenFolder
 */
async function analyzeCodegen(codegenFolder: string) {}

/**
 * Runs all folders with `generator.ts` present.
 * The generator function returns a string
 * which then becomes a content of `result.ts` file.
 *
 * Then all exported members of that file
 * get reexported into `_index.ts` within that folder.
 * @param codegenFolder
 */
async function runCodegen(codegenFolder: string) {
  await reduceFolder(
    codegenFolder,
    undefined,
    { isShallow: false },
    async (undef, folderItem) => {
      const { entity, entry } = folderItem;

      if (entry.isDirectory() && excludedFolders.includes(entry.name)) {
        return undef;
      }

      const isTypescriptGenerator =
        entry.isFile() &&
        entity.name === generatorFilename &&
        entity.ext === ".ts";

      if (isTypescriptGenerator) {
        await generateTypescriptCode(entity.dir);
      }

      return undef;
    }
  );
}

import path from "path";
// doing relative imports to please `ts-node`
import { CODEGEN_FOLDER } from "#environment/constants";
import { readFolder } from "#server/fs";
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
  const folderItems = await readFolder(codegenFolder);
  const workableFolders = folderItems.filter(({ entry }) => {
    return entry.isDirectory() && !excludedFolders.includes(entry.name);
  });

  for await (const { entity } of workableFolders) {
    const folderPath = path.format(entity);
    const folderItems = await readFolder(folderPath);
    const generator = folderItems.find(
      ({ entity }) => entity.name === generatorFilename
    );

    if (!generator) {
      console.warn(
        `No generators found at "${folderPath}". Skipping the folder.`
      );
      continue;
    }

    if (generator.entity.ext === ".ts") {
      await generateTypescriptCode(folderPath);
    }
  }
}

import path from "path";
// doing relative imports to please `ts-node`
import { CODEGEN_FOLDER } from "../../../environment/constants";
import { readFolder } from "../../server/fs/_index";

interface Module {
  default: () => Promise<string> | string;
}

const excludedFolders = ["one-off"];
const generatorFilename = "generator.ts";
const indexFilename = "_index.ts";
const resultFilename = "result.ts";

(async () => {
  try {
    await analyzeCodegen(CODEGEN_FOLDER);
    await runCodegen(CODEGEN_FOLDER);
  } catch (error) {
    console.error(error);
    throw error;
  }
})();

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
    const generatedCode = await generateCode(folderPath);
    console.info(generatedCode)
    await saveGeneratedCode(folderPath, generatedCode);
    await createIndex(folderPath);
  }
}

async function generateCode(folder: string): Promise<string> {
  const folderItems = await readFolder(folder);
  const generatorFile = folderItems.find(
    ({ entry }) => entry.name === generatorFilename
  );

  if (!generatorFile) {
    throw Error(`No "${generatorFilename}" found in "${folder}"`);
  }

  const generatorFilePath = path.format(generatorFile.entity);
  const module: Module = await import(generatorFilePath);
  const code = await Promise.resolve(module.default());

  return code;
}

async function saveGeneratedCode(folder: string, code: string) {}

async function createIndex(folder: string) {}

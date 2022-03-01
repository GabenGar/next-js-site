import path from "path";
import { saveToFile } from "../../../server/fs/_index";
import { generatorFilename, resultFilename, indexFilename } from "../types";
import { analyzeGeneratedCode } from "./analyze-code";

import type { ESModule } from "../types";
import type { IExports } from "./types";

export async function generateTypescriptCode(folderPath: string) {
  const generatedCode = await runGenerator(folderPath);
  const esModule = await saveGeneratedCode(folderPath, generatedCode);
  const exports = await analyzeGeneratedCode(folderPath);
  await createIndex(folderPath, exports);
}

async function runGenerator(folder: string): Promise<string> {
  const generatorFilePath = path.join(folder, `${generatorFilename}.ts`);
  const module: ESModule = await import(generatorFilePath);

  if (typeof module?.default !== "function") {
    throw Error(
      `There is no exported default function in "${generatorFilePath}".`
    );
  }

  const code = await Promise.resolve(module.default());

  return code;
}

async function saveGeneratedCode(folder: string, code: string) {
  const resultFilePath = path.join(folder, `${resultFilename}.ts`);
  await saveToFile(resultFilePath, code);
  const esModule: ESModule = await import(resultFilePath);

  return esModule;
}

async function createIndex(folder: string, exports: IExports) {
  const indexFilePath = path.join(folder, indexFilename);
  console.log("FOLDER: ", folder);
  console.log("EXPORTS: ", exports);
}

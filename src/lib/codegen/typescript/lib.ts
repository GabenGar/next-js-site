import path from "path";
import { saveToFile } from "../../../server/fs/_index";
import { generatorFilename, resultFilename, indexFilename } from "../types";

import type { ESModule } from "../types";

export async function generateTypescriptCode(folderPath: string) {
  const generatedCode = await runGenerator(folderPath);
  const esModule = await saveTypescriptCode(folderPath, generatedCode);
  await createTypescriptIndex(folderPath, esModule);
}

export async function runGenerator(folder: string): Promise<string> {
  const generatorFilePath = path.join(folder, generatorFilename);
  const module: ESModule = await import(generatorFilePath);

  if (typeof module?.default !== "function") {
    throw Error(
      `There is no exported default function in "${generatorFilePath}".`
    );
  }

  const code = await Promise.resolve(module.default());

  return code;
}

export async function saveTypescriptCode(folder: string, code: string) {
  const resultFilePath = path.join(folder, resultFilename);
  await saveToFile(resultFilePath, code);
  const esModule: ESModule = await import(resultFilePath);
  return esModule;
}

export async function createTypescriptIndex(
  folder: string,
  esModule: ESModule
) {
  const indexFilePath = path.join(folder, indexFilename);
  console.log("FOLDER: ", folder);
  console.log("MODULE: ", esModule);
}

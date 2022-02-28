import path from "path";
import { readFolder, saveToFile } from "../../server/fs/_index";
import { generatorFilename, resultFilename, indexFilename } from "./types";

import type { ESModule } from "./types";

export async function generateTypescriptCode(folder: string): Promise<string> {
  const folderItems = await readFolder(folder);
  const generatorFile = folderItems.find(
    ({ entry }) => entry.name === generatorFilename
  );

  if (!generatorFile) {
    throw Error(`No "${generatorFilename}" found in "${folder}"`);
  }

  const generatorFilePath = path.format(generatorFile.entity);
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

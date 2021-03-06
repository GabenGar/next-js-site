import path from "path";
import prettier from "prettier";
import { saveToFile } from "#server/fs";
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
  const formattedCode = prettier.format(code, { filepath: resultFilePath });
  await saveToFile(resultFilePath, formattedCode);
  const esModule: ESModule = await import(resultFilePath);

  return esModule;
}

async function createIndex(folder: string, exports: IExports) {
  const indexFilePath = path.join(folder, `${indexFilename}.ts`);
  const { members, types } = exports;
  // doing this hack because `schema-to-interface` package
  // doesn't allow to configure output interface name
  const reexportedTypes = types.map((name) => `${name} as I${name}`);
  const content = [
    Boolean(members.length) &&
      `export { ${members.join(", ")} } from "./result";`,
    Boolean(types.length) &&
      `export type { ${reexportedTypes.join(", ")} } from "./result";`,
  ]
    .filter((statement) => statement !== false)
    .join("\n");

  const formattedContent = prettier.format(content, {
    filepath: indexFilePath,
  });

  await saveToFile(indexFilePath, formattedContent);
}

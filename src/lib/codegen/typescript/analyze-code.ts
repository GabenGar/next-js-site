import path from "path";
import {
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  isInterfaceDeclaration,
} from "typescript";
import { readFile } from "#server/fs";
import { resultFilename } from "../types";

import type { SourceFile } from "typescript";
import type { IExports } from "./types";

export async function analyzeGeneratedCode(folder: string): Promise<IExports> {
  const resultFilePath = path.join(folder, `${resultFilename}.ts`);
  const resultContent = await readFile(resultFilePath);

  const sourceFile = createSourceFile(
    resultFilePath,
    resultContent,
    ScriptTarget.ES2015,
    true
  );

  const exports = await getExports(sourceFile);

  return exports;
}

async function getExports(sourceFile: SourceFile): Promise<IExports> {
  const exports: IExports = {
    members: [],
    types: [],
  };

  sourceFile.forEachChild((node) => {
    // if (!isExportAssignment(node)) {
    //   return;
    // }

    // node.name

    // const parentKind = node.parent?.kind || 0;
    // const kindInfo = {
    //   parentKind: `${parentKind} (${SyntaxKind[parentKind]})`,
    //   nodeKind: `${node.kind} (${SyntaxKind[node.kind]})`,
    // };
    // console.log(kindInfo);

    if (isInterfaceDeclaration(node)) {
      const { parent, modifiers, ...nodeInfo } = node;

      if (!modifiers?.length) {
        return;
      }

      const exportModifier = modifiers.find(
        (modifier) => modifier.kind === SyntaxKind.ExportKeyword
      );

      if (!exportModifier) {
        return;
      }

      exports.types.push(String(nodeInfo.name.escapedText));
    }
  });

  return exports;
}

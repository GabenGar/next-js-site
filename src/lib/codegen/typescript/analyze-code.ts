import path from "path";
import {
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  isInterfaceDeclaration,
} from "typescript";
import { readFile } from "#server/fs";
import { resultFilename } from "../types";

import type { SourceFile, Node } from "typescript";
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

    if (isExport(node)) {
      const { parent, modifiers, kind, ...nodeInfo } = node;
      console.log(`Node Kind: ${kind} (${SyntaxKind[kind]})\n`, nodeInfo);
      node.forEachChild((node) => {
        console.log(`Node Kind: ${node.kind} (${SyntaxKind[node.kind]})\n`, nodeInfo);
      })
    }
  });

  return exports;
}

function getKindInfo(node: Node) {
  const { parent, modifiers, kind, ...nodeInfo } = node;
  const parentKind = parent?.kind
    ? `${parent.kind} (${SyntaxKind[parent.kind]})`
    : 0;
  const kinds = {
    parentKind: `Parent kind: ${parentKind}`,
    kind: `Kind: ${kind} (${SyntaxKind[kind]})`,
  };
  console.log(kinds);
  // modifiers && console.log(modifiers)
  // console.log(nodeInfo)
}

function isExport(node: Node) {
  if (!node.modifiers) {
    return false;
  }

  const result = node.modifiers.map(
    (modifer) => modifer.kind === SyntaxKind.ExportKeyword
  );

  return result;
}

import path from "path";
import {
  createSourceFile,
  ScriptTarget,
  SyntaxKind,
  isInterfaceDeclaration,
  forEachChild,
  isVariableDeclarationList,
  isIdentifier,
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

    // detect exports 
    if (isExport(node)) {

      // iterate over children and find `VariableDeclarationList`
      node.forEachChild((node: Node) => {
        if (isVariableDeclarationList(node)) {
          const { declarations } = node;

          // iterate over declarations and find the `name` attribute
          declarations.forEach((declaration) => {
            const { name } = declaration;

            // if it's an identifier, extract it to exports
            if (isIdentifier(name)) {
              const exportedName = String(name.escapedText);

              exports.members.push(exportedName);
            }
          });
        }
      });
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

  const result = node.modifiers.find(
    (modifer) => modifer.kind === SyntaxKind.ExportKeyword
  );

  return Boolean(result);
}

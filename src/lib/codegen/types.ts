export type CodeGenerator = () => Promise<string> | string;

export interface ESModule {
  default?: CodeGenerator;
  [k: string]: unknown;
}

export const excludedFolders = ["one-off"];
export const generatorFilename = "generator";
export const indexFilename = "_index";
export const resultFilename = "result";

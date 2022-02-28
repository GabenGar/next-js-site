export interface ESModule {
  default?: () => Promise<string> | string;
  [k: string]: unknown;
}

export const excludedFolders = ["one-off"];
export const generatorFilename = "generator.ts";
export const indexFilename = "_index.ts";
export const resultFilename = "result.ts";

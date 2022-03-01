export interface ESModule {
  default?: () => Promise<string> | string;
  [k: string]: unknown;
}

export const excludedFolders = ["one-off"];
export const generatorFilename = "generator";
export const indexFilename = "_index";
export const resultFilename = "result";

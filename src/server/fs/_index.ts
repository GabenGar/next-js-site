export {
  readFile,
  readFolder,
  saveToFile,
  getTempFolder,
  deleteFile,
  readFileToBuffer,
} from "./lib";
export { startPathReduce as reduceFolder } from "./reduce-folder";
export { readJSON, saveToJSON } from "./json";
export type { ReduceOptions, ReducerCallback } from "./reduce-folder";
export { FolderItem } from "./types";
export type { PathLike } from "./types";

import type { ParsedPath } from "path";
import type { Dirent } from "fs-extra";

export interface IFolderItem {
  entity: ParsedPath;
  entry: Dirent;
}
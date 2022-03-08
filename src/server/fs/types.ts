import path from "path";
import type { ParsedPath } from "path";
import type { Dirent } from "fs-extra";

export type PathLike = string | ParsedPath;

export interface IFolderItem {
  entity: ParsedPath;
  entry: Dirent;
}

export class FolderItem implements IFolderItem {
  entity: ParsedPath;
  entry: Dirent;

  constructor(entity: PathLike, entry: Dirent) {
    this.entity = typeof entity === "string" ? path.parse(entity) : entity;
    this.entry = entry;
  }

  toString() {
    return path.format(this.entity);
  }
}

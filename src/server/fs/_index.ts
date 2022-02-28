import path from "path";
import fse from "fs-extra";

import type { ParsedPath } from "path";
import type { Dirent } from "fs-extra";

export interface FolderItem {
  entity: ParsedPath;
  entry: Dirent;
}

/**
 * @param folderPath Absolute path.
 */
export async function readFolder(folderPath: string): Promise<FolderItem[]> {
  if (!path.isAbsolute(folderPath)) {
    throw Error(`Path "${folderPath}" is not absolute.`);
  }

  const folderEntries = await fse.readdir(folderPath, {
    encoding: "utf-8",
    withFileTypes: true,
  });
  const folderItems = folderEntries.map((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    const entity = path.parse(entryPath);
    const folderItem = {
      entry,
      entity,
    };

    return folderItem;
  });

  return folderItems;
}

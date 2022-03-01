import path from "path";
import fse from "fs-extra";
import { FolderItem } from "./types";

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
    const folderItem = new FolderItem(entryPath, entry);

    return folderItem;
  });

  return folderItems;
}

export async function readFile(filePath: string) {
  const content = await fse.readFile(filePath, { encoding: "utf-8" });
  return content;
}

export async function saveToFile(filePath: string, content: string) {
  await fse.writeFile(filePath, content, { encoding: "utf-8" });
}

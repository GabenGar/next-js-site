import { deleteFile, readFile } from "#server/fs";
import { uploadFile as uploadFileToYaDisk } from "#server/storage/ya-disk";

import type { IFormFileObject } from "./types";

export async function uploadFile(path: string, fileInfo: IFormFileObject) {
  try {
    const fileContent = await readFile(fileInfo.filepath);
    const buffer = Buffer.from(fileContent);
    const publicURL = await uploadFileToYaDisk(path, buffer);

    return publicURL;
  } finally {
    await deleteFile(fileInfo.filepath);
  }
}

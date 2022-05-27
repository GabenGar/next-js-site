import { deleteFile, readFileToBuffer } from "#server/fs";
import { uploadFile as uploadFileToYaDisk } from "#server/storage/ya-disk";

import type { IFormFileObject } from "./types";

export async function uploadFile(path: string, fileInfo: IFormFileObject) {
  try {
    const fileContent = await readFileToBuffer(fileInfo.filepath);
    const publicURL = await uploadFileToYaDisk(path, fileContent);

    return publicURL;
  } finally {
    await deleteFile(fileInfo.filepath);
  }
}

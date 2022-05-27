import { deleteFile } from "#server/fs";
import { uploadFile as uploadFileToYaDisk } from "#server/storage/ya-disk";

import type { IFormFileObject } from "./types";

export async function uploadFile(path: string, fileInfo: IFormFileObject, fileContent: Buffer) {
  try {
    const publicURL = await uploadFileToYaDisk(path, fileContent);

    return publicURL;
  } finally {
    await deleteFile(fileInfo.filepath);
  }
}

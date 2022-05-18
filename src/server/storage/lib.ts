import { Blob } from "fetch-blob";
import { deleteFile, readFile } from "#server/fs";
import { uploadFile as uploadFileToYaDisk } from "#server/storage/ya-disk";

import type { IFormFileObject } from "./types";

export async function uploadFile(path: string, fileInfo: IFormFileObject) {
  try {
    const fileContent = await readFile(fileInfo.filepath);
    const file = new Blob([fileContent], {
      type: fileInfo.mimetype,
    });

    const publicURL = await uploadFileToYaDisk(path, file);

    return publicURL;
  } finally {
    await deleteFile(fileInfo.filepath);
  }
}

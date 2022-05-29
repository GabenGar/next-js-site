import { StorageError } from "#server/errors";
import { uploadFile as uploadFileToYaDisk } from "#server/storage/ya-disk";

export async function uploadFile(path: string, fileContent: Buffer) {
  try {
    const publicURL = await uploadFileToYaDisk(path, fileContent);

    return publicURL;
  } catch (error) {
    const isStorageError = error instanceof StorageError;

    if (!isStorageError) {
      throw error;
    }

    const message = [
      `Failed to upload file at path "${path}"`,
      error.cause && `Reason:\n${error.cause}`,
    ].join("\n");

    throw new StorageError(message, { cause: error });
  }
}

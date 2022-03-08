import { readFolder } from "./lib";
import { FolderItem } from "./types";

export interface ReduceOptions {
  /**
   * Traverse only the folder in the path without going into subfolders.
   * @default true
   */
  isShallow: boolean;
}

export type ReducerCallback<Type> = (
  accumulator: Type,
  currentValue: FolderItem
) => Promise<Type> | Type;

const defaultReduceOptions: ReduceOptions = {
  isShallow: true,
} as const;

/**
 * Traverses the folder and calls a callback
 * on each item in folder.
 */
export async function startPathReduce<Type>(
  inputPath: string,
  initialValue: Type,
  options: ReduceOptions = defaultReduceOptions,
  callback: ReducerCallback<Type>
): Promise<Type> {
  const finalOptions = options
    ? { ...defaultReduceOptions, ...options }
    : defaultReduceOptions;

  const result = await reduceFolder<Type>(
    inputPath,
    initialValue,
    finalOptions,
    callback
  );

  return result;
}

async function reduceFolder<Type>(
  folderPath: string,
  initialValue: Type,
  options: ReduceOptions,
  callback: ReducerCallback<Type>
): Promise<Type> {
  const folderItems = await readFolder(folderPath);
  let result = initialValue;

  for await (const folderItem of folderItems) {
    result = await Promise.resolve(callback(result, folderItem));

    // if is shallow or item is not a directory
    if (options.isShallow || !folderItem.entry.isDirectory()) {
      continue;
    }

    const newFolderPath = folderItem.toString();
    result = await reduceFolder(newFolderPath, result, options, callback);
  }

  return result;
}

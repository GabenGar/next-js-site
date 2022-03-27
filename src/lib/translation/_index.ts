import path from "path";
import { SCHEMA_FOLDER, PROJECT_ROOT } from "#environment/constants";
import { reduceFolder, readJSON, readFolder } from "#server/fs";

const schemasFolder = path.join(SCHEMA_FOLDER, "localization");
const localesPath = path.join(PROJECT_ROOT, "public", "locales");

export async function getMaxLineCount(folderPath: string = schemasFolder) {
  const totalCount = await reduceFolder<number>(
    folderPath,
    0,
    { isShallow: false, isFilesOnly: true },
    async (totalCount, folderItem) => {
      const { entity } = folderItem;

      if (entity.ext !== ".json") {
        return totalCount;
      }

      const schemaObj = await readJSON<{ required: string[] }>(
        folderItem.toString()
      );

      const newCount = totalCount + schemaObj.required.length;

      return newCount;
    }
  );

  return totalCount;
}

export async function getLineCountPerLanguage(
  folderPath: string = localesPath
) {
  const langFolders = await readFolder(folderPath);
  const langCounts: Record<string, number> = {};

  for await (const folderItem of langFolders) {
    const { entry, entity } = folderItem;

    if (!entry.isDirectory()) {
      continue;
    }

    const lang = entity.base;
    const count = await countLanguageLines(folderItem.toString());

    langCounts[lang] = count;
  }

  return langCounts;
}

async function countLanguageLines(langFolder: string) {
  const count = await reduceFolder(
    langFolder,
    0,
    { isFilesOnly: true },
    async (count, folderItem) => {
      const { entity } = folderItem;

      if (entity.ext !== ".json") {
        return count;
      }

      const localizationObj = await readJSON<Record<string, string>>(
        folderItem.toString()
      );

      const newCount = count + Object.keys(localizationObj).length;

      return newCount;
    }
  );

  return count;
}

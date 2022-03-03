import fse from "fs-extra";

export async function readJSON<Type extends unknown>(jsonPath: string) {
  const output: Type = await fse.readJSON(jsonPath);
  return output;
}

export async function saveToJSON(outputPath: string, value: any) {
  await fse.writeJSON(outputPath, value);
}

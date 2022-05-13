import {
  validateYaDiskDiskFields,
  validateYaDiskResourceFields,
} from "#codegen/schema/validations";
import { fetchDisk, getPathInfo } from "#server/storage/ya-disk";

describe("Yandex.Disk API", () => {
  it("fetches disk", async () => {
    const yaDiskData = await fetchDisk();
    const validationResult = await validateYaDiskDiskFields(yaDiskData);

    expect(validationResult.is_successful).toBe(true);
  });

  it("fetches the path info", async () => {
    const path = "/";
    const pathData = await getPathInfo(path);
    const validationResult = await validateYaDiskResourceFields(pathData);

    expect(validationResult.is_successful).toBe(true);
  });
});

import { validateYaDiskDiskFields } from "#codegen/schema/validations";
import { fetchDisk } from "#server/storage/ya-disk";

describe("Yandex.Disk endpoints", () => {
  it("fetches disk", async () => {
    const yaDiskData = await fetchDisk();
    const validationResult = await validateYaDiskDiskFields(yaDiskData);

    expect(validationResult.is_successful).toBe(true);
  });
});
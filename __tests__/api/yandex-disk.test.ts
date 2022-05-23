import path from "path";
import {
  validateYaDiskDiskFields,
  validateYaDiskResourceFields,
  validateYaDiskLinkFields,
} from "#codegen/schema/validations";
import {
  fetchDisk,
  getPathInfo,
  createFolder,
  deletePath,
  uploadFile,
} from "#server/storage/ya-disk";

describe.only("Yandex.Disk API", () => {
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

  describe("Manipulate files", () => {
    const testFolderPath = "/test/test";
    const testFileName = `test-file.md`;
    const testFileContent = `# Test`;

    it("creates a nested folder at the path", async () => {
      const link = await createFolder(testFolderPath);
      const validationResult = await validateYaDiskLinkFields(link);
      expect(validationResult.is_successful).toBe(true);
    });

    it("uploads the file", async () => {
      const filePath = path.join(testFolderPath, testFileName);

      expect(async () => {
        await uploadFile(
          filePath,
          new Blob([testFileContent], {
            type: "text/plain",
          })
        );
      }).not.toThrow();
    });

    it("deletes the folder/file at the path", async () => {
      const result = await deletePath(path.dirname(testFolderPath));

      expect(result).toBe(true);
    });
  });
});

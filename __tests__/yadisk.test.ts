import { posix as unixPath } from "path";
import { NO_CONTENT } from "#environment/constants/http";
import {
  validateYaDiskDiskFields,
  validateYaDiskResourceFields,
  validateYaDiskLinkFields,
} from "#codegen/schema/validations";
import { FetchError } from "#lib/errors";
import {
  fetchDisk,
  getPathInfo,
  createFolder,
  deletePath,
  uploadFile,
  createFolderAPI,
  deletePathAPI,
  diskPathFromURL,
} from "#server/storage/ya-disk";

const apiTestFolder = "/api-test";
const nestedAPIFolder = unixPath.join(apiTestFolder, "nested");

describe("Basic API interactions", () => {
  it("gets disk info", async () => {
    const yaDiskData = await fetchDisk();
    const validationResult = await validateYaDiskDiskFields(yaDiskData);

    expect(validationResult.is_successful).toBe(true);
  });

  it("gets the root info", async () => {
    const path = "/";
    const pathData = await getPathInfo(path);
    const validationResult = await validateYaDiskResourceFields(pathData);

    expect(validationResult.is_successful).toBe(true);
  });

  it("creates folder", async () => {
    const link = await createFolderAPI(apiTestFolder);
    const validationResult = await validateYaDiskLinkFields(link);

    expect(validationResult.is_successful).toBe(true);
  });

  it("deletes folder", async () => {
    const response = await deletePathAPI(apiTestFolder);

    expect(response.status).toBe(NO_CONTENT);
  });

  it("fails on creating nested folder", async () => {
    expect(async () => {
      await createFolderAPI(nestedAPIFolder);
    }).rejects.toBe(FetchError);
  });
});

describe("Yandex.Disk API", () => {
  const testFolderPath = "/test/nested-test";
  const testFileName = `test-file.md`;
  const testFileContent = `# Test`;

  it("creates a nested folder", async () => {
    const link = await createFolder(testFolderPath);
    const validationResult = await validateYaDiskLinkFields(link);
    expect(
      validationResult.is_successful &&
        diskPathFromURL(validationResult.data.href)
    ).toBe(testFolderPath);
  });

  it("uploads the file", async () => {
    const filePath = unixPath.join(testFolderPath, testFileName);

    expect(async () => {
      await uploadFile(
        filePath,
        new Blob([testFileContent], {
          type: "text/plain",
        })
      );
    }).not.toThrow();
  });

  it("deletes the folder", async () => {
    const result = await deletePath(unixPath.dirname(testFolderPath));

    expect(result).toBe(true);
  });
});

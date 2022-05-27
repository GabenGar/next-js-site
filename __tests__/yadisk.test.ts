import { posix as unixPath } from "path";
import { fileTypeFromBuffer } from "file-type";
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
    // expect.assertions(1);
    const yaDiskData = await fetchDisk();
    const validationResult = await validateYaDiskDiskFields(yaDiskData);

    return expect(validationResult.is_successful).toBe(true);
  });

  it("gets the root info", async () => {
    // expect.assertions(1);
    const path = "/";
    const pathData = await getPathInfo(path);
    const validationResult = await validateYaDiskResourceFields(pathData);

    return expect(validationResult.is_successful).toBe(true);
  });

  it("creates folder", async () => {
    // expect.assertions(1);
    const link = await createFolderAPI(apiTestFolder);
    const validationResult = await validateYaDiskLinkFields(link);

    return expect(validationResult.is_successful).toBe(true);
  });

  it("deletes folder", async () => {
    // expect.assertions(1);
    const response = await deletePathAPI(apiTestFolder);

    return expect(response.status).toBe(NO_CONTENT);
  });

  it("fails on creating nested folder", async () => {
    // expect.assertions(1);
    return expect(async () => {
      await createFolderAPI(nestedAPIFolder);
    }).rejects.toBeInstanceOf(FetchError);
  });
});

describe("Yandex.Disk API", () => {
  const testFolderPath = "/test/nested-test";
  const testFileName = `test-file.md`;
  const testFileContent = `# Test`;

  it("creates a nested folder", async () => {
    // expect.assertions(1);
    const link = await createFolder(testFolderPath);
    const validationResult = await validateYaDiskLinkFields(link);

    return expect(
      validationResult.is_successful &&
        diskPathFromURL(validationResult.data.href)
    ).toBe(testFolderPath);
  });

  it("uploads the file", async () => {
    // expect.assertions(1);
    const filePath = unixPath.join(testFolderPath, testFileName);
    const buffer = Buffer.from(testFileContent);
    const publicURL = await uploadFile(
      filePath,
      // @ts-expect-error blob types
      buffer
      // new Blob([], {
      //   type: "text/plain",
      // })
    );
    return expect(typeof publicURL === "string").toBe(true);
  });

  it("deletes the folder", async () => {
    // expect.assertions(1);
    const result = await deletePath(unixPath.dirname(testFolderPath));

    return expect(result).toBe(true);
  });
});

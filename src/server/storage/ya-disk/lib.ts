import { createFetch } from "#browser";
import { IYaDiskDisk } from "#codegen/schema/interfaces";
import { YANDEX_DISK_ACCESS_TOKEN } from "#environment/vars";
const baseURL = "https://cloud-api.yandex.net";

const customFetch = createFetch(baseURL);

export async function fetchDisk() {
  const headers = new Headers([
    ["Authorization", `OAuth ${YANDEX_DISK_ACCESS_TOKEN}`],
  ]);

  const response = await customFetch("/v1/disk", {
    method: "GET",
    headers,
  });

  const diskData: IYaDiskDisk = await response.json();
  return diskData;
}

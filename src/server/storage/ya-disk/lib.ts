import { yaDiskfetch } from "./fetch";

import type { IYaDiskDisk } from "./types";

export async function fetchDisk() {
  const diskData = await yaDiskfetch<IYaDiskDisk>("/v1/disk", {
    method: "GET",
  });

  return diskData;
}
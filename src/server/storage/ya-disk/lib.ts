import { yaDiskfetch } from "./fetch";

import type { IDisk, IOperationStatus } from "./types";

export async function fetchDisk() {
  const diskData = await yaDiskfetch<IDisk>("/v1/disk", {
    init: {
      method: "GET",
    },
  });

  return diskData;
}

export async function getOperationStatus(operationID: string) {
  const operationStatus = await yaDiskfetch<IOperationStatus>(
    `/v1/disk/operations/${operationID}`,
    {
      init: {
        method: "GET",
      },
    }
  );

  return operationStatus;
}

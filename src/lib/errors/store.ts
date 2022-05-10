import { ClientError } from "./lib";

const storeTypes = ["localStorage", "redux", "cookie"] as const;
type IStoreType = typeof storeTypes[number];

export class StoreError extends ClientError {
  type: IStoreType;

  name = "StoreError";

  constructor(
    type: IStoreType,
    message?: string,
    options?: ErrorOptions,
    ...params: any[]
  ) {
    super("", options, ...params);
    this.message = [`${type}:`, message].join("\n");
    this.type = type;
  }
}

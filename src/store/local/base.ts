import { toJSON, fromJSON } from "#lib/json";
import { StoreError } from "#lib/errors";

export const LOCAL_STORAGE = {
  TEST: "__storage_test__",
  THEME: "theme",
  ACCOUNT: "account",
  FM_OWN_COMMENTS: "fm_own_comments",
} as const;

const storeItems = Object.values(LOCAL_STORAGE);

type ILocalStoreItem = typeof storeItems[number];

export function getItem<Type = unknown>(
  storeName: ILocalStoreItem,
  defaultValue?: Type
): Type | undefined {
  const storageItem = localStorage.getItem(storeName);

  if (storageItem === null) {
    return defaultValue;
  }

  const item = fromJSON<Type>(storageItem);

  if (!item) {
    return defaultValue;
  }

  return item;
}

export function setItem<Type = unknown>(storeName: ILocalStoreItem, value: Type) {
  try {
    const jsonValue = toJSON<Type>(value);
    localStorage.setItem(storeName, jsonValue);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    const storeError = new StoreError(
      "localStorage",
      `Failed to set item "${storeName}"`,
      { cause: error }
    );

    throw storeError;
  }
}

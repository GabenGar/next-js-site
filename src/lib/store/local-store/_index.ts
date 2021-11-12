export {
  createStore as createLocalStore,
  isAvailable as isLocalStoreAvailable,
  init as initLocalStorage,
} from "./constructor";
export {
  legacyStoreItems as legacyLocalStoreitems,
  storeItems as localStoreItems,
} from "./base";
export type { LocalStore, OnChangeCallback as onChangeCallback } from "./types";

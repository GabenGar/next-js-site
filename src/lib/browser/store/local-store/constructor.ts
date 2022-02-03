import { IS_DEVELOPMENT } from "#environment/derived";
import { storeItems, legacyStoreItems, createdItems } from "./base";

import type { LocalStore, OnChangeCallback } from "./types";

export function init() {
  window.addEventListener("storage", (event) => {
    // `Storage.clear()` is called
    if (event.key === null) {
      location.reload();
    }
  });
}

export function isAvailable() {
  try {
    localStorage.setItem(
      storeItems.__storage_test__,
      storeItems.__storage_test__
    );
    localStorage.removeItem(storeItems.__storage_test__);
    return true;
  } catch (error) {
    return false;
  }
}

export function createStore(name: string): LocalStore {
  if (createdItems.has(name)) {
    if (IS_DEVELOPMENT) {
      console.error(
        `\`localStorage\` item "${name}" is already created, use the methods for manipualting its values provided by the module which created it instead.`
      );
    } else {
      console.warn(`\`localStorage\` item "${name}" is already created.`);
    }
  }

  // @ts-expect-error not assed to please typescript
  if (!storeItems[name] && !legacyStoreItems[name]) {
    console.warn(
      `\`localStorage\` item "${name}" is not present on the list of allowed names, its integrity is not guarantied.`
    );
  }

  createdItems.add(name);

  return {
    get: getValue(name),
    set: setValue(name),
    onChange: onValueChange(name),
  };
}

function getValue(name: string) {
  return () => {
    const result = localStorage.getItem(name);

    if (result === null) {
      return false;
    }

    return result;
  };
}

function setValue(name: string) {
  return (value: string) => {
    try {
      localStorage.setItem(name, value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}

function onValueChange(name: string) {
  return (callback: OnChangeCallback) => {
    window.addEventListener("storage", (event) => {
      if (event.key === name) {
        callback(event.oldValue, event.newValue);
      }
    });
  };
}

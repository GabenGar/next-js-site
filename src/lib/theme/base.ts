import {
  createCookieStore,
  createLocalStore,
  localStoreItems,
  cookieKeys,
} from "#lib/store";
import type { LocalStore, CookieStore } from "#lib/store";

export const AVAILABLE_THEMES = {
  DARK: "dark",
  LIGHT: "light",
};
export const defaultTheme = AVAILABLE_THEMES.LIGHT;
let store: { cookie: CookieStore; local: LocalStore };

export function init() {
  store = {
    cookie: createCookieStore(cookieKeys.theme),
    local: createLocalStore(localStoreItems.theme),
  };
  setCurrentTheme(getCurrentTheme());
}

export function getCurrentTheme() {
  const currentTheme =
    store.cookie.get() || store.local.get() || document.documentElement.dataset.theme;

  if (!currentTheme) {
    const isSwitched = setCurrentTheme(defaultTheme);

    if (!isSwitched) {
      throw Error("Failed to switch the theme");
    }

    return defaultTheme;
  }

  return currentTheme;
}

export function setCurrentTheme(theme: string) {
  const isSet = store.cookie.set(theme) && store.local.set(theme);

  if (!isSet) {
    return false;
  }

  document.documentElement.dataset.theme = theme;

  return theme;
}

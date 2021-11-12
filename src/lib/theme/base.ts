import { createLocalStore, localStoreItems, LocalStore } from "#lib/store";

export const AVAILABLE_THEMES = {
  DARK: "dark",
  LIGHT: "light",
};
export const defaultTheme = AVAILABLE_THEMES.LIGHT;
let store: LocalStore;

export function init() {
  store = createLocalStore(localStoreItems.theme);
  setCurrentTheme(getCurrentTheme());
}

export function getCurrentTheme() {
  const currentTheme = store.get() || document.documentElement.dataset.theme;

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
  const isSet = store.set(theme);

  if (!isSet) {
    return false;
  }

  document.documentElement.dataset.theme = theme;

  return theme;
}

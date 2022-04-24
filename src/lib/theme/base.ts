export const AVAILABLE_THEMES = {
  DARK: "dark",
  LIGHT: "light",
} as const;
export const themes = Object.values(AVAILABLE_THEMES);
export type ITheme = typeof themes[number];

export const defaultTheme = AVAILABLE_THEMES.LIGHT;

export function init() {
  setCurrentTheme(getCurrentTheme());
}

export function getCurrentTheme() {
  const currentTheme = document.documentElement.dataset.theme;

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
  document.documentElement.dataset.theme = theme;

  return theme;
}

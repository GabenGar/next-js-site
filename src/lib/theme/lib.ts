import { getCookie, setCookie } from "#browser/store/cookie-store";

export const AVAILABLE_THEMES = {
  DARK: "dark",
  LIGHT: "light",
} as const;
export const themes = Object.values(AVAILABLE_THEMES);
export type ITheme = typeof themes[number];

export function getTheme() {
  let currentTheme: ITheme;

  try {
    currentTheme = getCookie("theme") as ITheme;
  } catch (error) {
    currentTheme = document.documentElement.dataset.theme as ITheme;
    setCookie("theme", currentTheme);
  }

  return currentTheme;
}
export function setTheme(theme: ITheme) {
  document.documentElement.dataset.theme = theme;
  setCookie("theme", theme);

  return theme;
}

import { initLocalStorage } from "#lib/store";
import { initTheme } from "#lib/theme";

export function initClient() {
  initLocalStorage()
  initTheme()
}

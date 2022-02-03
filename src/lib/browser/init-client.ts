import { initLocalStorage, initCookieStore } from "#lib/browser/store";
import { initTheme } from "#lib/theme";

/**
 * Initiate all client-side logic.
 */
export function initClient() {
  initCookieStore()
  initLocalStorage()
  initTheme()
}

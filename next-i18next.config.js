// @ts-check
import path from "path";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: IS_DEVELOPMENT,
};

export default config;

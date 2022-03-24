const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en"
  },
  reloadOnPrerender: IS_DEVELOPMENT
};

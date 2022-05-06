// @ts-check
const path = require("path");
const { i18n } = require("./next-i18next.config");

// const sassVars = `$site-origin: '${process.env.NEXT_PUBLIC_SITE_ORIGIN}';`

/** @type {import('next').NextConfig} */
const nextJSConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["src", "environment"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  /**
   * @param {import("webpack").Configuration} config
   * @param {import("next/dist/server/config-shared").WebpackConfigContext } context
   * @returns {import("webpack").Configuration}
   */
  webpack: function (config, context) {
    const { dev, isServer, dir } = context;

    // going this roundabout way because `@next/bundle-analyzer`
    // opens a browser and doesn't have plugin options
    if (!dev && process.env.ANALYZE === 'true') {

      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      const filename = isServer ? "server.html" : "client.html"
      const reportFilename = path.join(dir, ".next", "analyze", filename)

      config && config.plugins && config.plugins.push(
        // @ts-expect-error some typing issue stuff
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename,
          openAnalyzer: false
        })
      )
    }

    if (typeof this === "function") {
      // @ts-expect-error
      return this(config, context)
    }

    return config
  }

}


module.exports = nextJSConfig;

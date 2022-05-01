// @ts-check
const path = require("path");
const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})



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
  webpack: (config, { dev, isServer, dir }) => {

    if (!dev) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      const filename = isServer ? "server.html" : "client.html"
      const reportFilename = path.join(dir, ".next", "analyze", filename)

      config && config.plugins && config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename,
          openAnalyzer: false
        })
      )
    }

    return config
  }

}


module.exports = nextJSConfig;

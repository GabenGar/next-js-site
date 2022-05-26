// @ts-check
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { i18n } = require("./next-i18next.config");

// const sassVars = `$site-origin: '${process.env.NEXT_PUBLIC_SITE_ORIGIN}';`

/**
 * @typedef {import('next/dist/lib/load-custom-routes').Rewrite} Rewrite
 */

/**
 * @typedef RewriteOBject
 * @property {Rewrite[]} beforeFiles
 * @property {Rewrite[]} afterFiles
 * @property {Rewrite[]} fallback
 */

/**
 * @returns {Promise<Rewrite[] | RewriteOBject>}
 */
async function rewrites() {
  return [
    {
      source: "/storage/yandex-disk/:path*",
      destination: "https://downloader.disk.yandex.ru/disk/:path*",
    },
  ];
}

async function nextJSConfig(phase, { defaultConfig }) {
  /** @type import('next').NextConfig */
  const config = {
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
      if (!dev && process.env.ANALYZE === "true") {
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        const filename = isServer ? "server.html" : "client.html";
        const reportFilename = path.join(dir, ".next", "analyze", filename);

        config &&
          config.plugins &&
          config.plugins.push(
            // @ts-expect-error webpack error
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              reportFilename,
              openAnalyzer: false,
            })
          );
      }

      if (typeof this === "function") {
        // @ts-expect-error
        return this(config, context);
      }

      return config;
    },
    rewrites,
  };

  return config;
}

module.exports = nextJSConfig;

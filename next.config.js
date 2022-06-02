// @ts-check
import path from "path";
import { fileURLToPath } from "url";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { default as internalization } from "./next-i18next.config.js";

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

const { __dirname } = cjsDirname(import.meta.url);

async function nextJSConfig(phase, { defaultConfig }) {
  /** @type import('next').NextConfig */
  const config = {
    i18n: internalization.i18n,
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

/**
 * ESM equivalent of `__filename` and `__dirname`.
 * @link https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
 * @param {string} metaURL
 */
export function cjsDirname(metaURL) {
  const __filename = fileURLToPath(metaURL);
  const __dirname = path.dirname(__filename);

  return {
    __filename,
    __dirname,
  };
}

export default nextJSConfig;

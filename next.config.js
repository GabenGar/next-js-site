// @ts-check
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["src", "environment"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
};

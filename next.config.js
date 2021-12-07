const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'src',
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
}

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    "^#scripts$": "<rootDir>/scripts/_index.js",
    "^#environment/(.*)$": "<rootDir>/environment/$1",
    "^#schema/(.*)$": "<rootDir>/schema/$1",
    "^#codegen/(.*)$": "<rootDir>/src/codegen/$1/_index.ts",
    "^#browser$": "<rootDir>/src/browser/_index.ts",
    "^#browser/(.*)$": "<rootDir>/src/browser/$1/_index.ts",
    "^#server/(.*)$": "<rootDir>/src/server/$1/_index.ts",
    "^#database$": "<rootDir>/src/database/_index.ts",
    "^#database/(.*)$": "<rootDir>/src/database/$1/_index.ts",
    "^#assets$": "<rootDir>/src/assets/_index.ts",
    "^#assets/(.*)$": "<rootDir>/src/assets/$1",
    "^#lib/(.*)$": "<rootDir>/src/lib/$1/_index.ts",
    "^#pages/(.*)$": "<rootDir>/src/pages/$1",
    "^#store/(.*)$": "<rootDir>/src/store/$1/_index.ts",
    "^#components/(.*)$": "<rootDir>/src/components/$1/_index.ts",
    "^#styles/(.*)$": "<rootDir>/src/styles/$1",
    "^#types/(.*)$": "<rootDir>/src/types/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

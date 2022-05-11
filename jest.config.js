const nextJest = require("next/jest").default;

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
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
    "^#store/(.*)$": "<rootDir>/src/store/$1/_index.ts",
    "^#components/(.*)$": "<rootDir>/src/components/$1/_index.ts",
    "^#styles/(.*)$": "<rootDir>/src/styles/$1",
    "^#types/(.*)$": "<rootDir>/src/types/$1",
  },
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

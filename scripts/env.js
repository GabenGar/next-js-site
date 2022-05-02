// @ts-check
import fse from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

/**
 * @typedef EnvSchema
 * @property {string} type
 * @property {unknown} default
 */

/**
 * @typedef ConfigSchema
 * @property {Record<string, EnvSchema>} properties
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, "..");

const envTypes = {
  string(value) {
    return String(value).trim();
  },
  integer(value) {
    return Number(value);
  },
  boolean(value) {
    return Boolean(value);
  },
};

if (process.env.NODE_ENV !== "production") {
  const envFilePath = path.join(rootPath, ".env.local");
  const envProdFilePath = path.join(rootPath, ".env.production.local");
  setupEnvFile(envFilePath);

  setupProdEnvFile(envProdFilePath)
}

/**
 *
 * @param {string} envFilePath
 */
function setupEnvFile(envFilePath) {
  const envSchemaPath = path.join(rootPath, "schema", "config.schema.json");



  /**
   * @type {ConfigSchema}
   */
  const schemaJSON = fse.readJSONSync(envSchemaPath, { encoding: "utf-8" });

  /**
   * @type {Map<string, string>}
   */
  const envMap = Object.entries(schemaJSON.properties).reduce(
    (envMap, [key, props]) => {

      const value = props.default ? envTypes[props.type](props.default) : "";
      envMap.set(key, value);
      return envMap;
    },
    new Map()
  );

  const envString = Array.from(envMap.entries())
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("\n");

  if (!fse.existsSync(envFilePath)) {
    fse.writeFileSync(envFilePath, envString);
    return;
  }

  const envFileContent = fse.readFileSync(envFilePath, "utf-8");
  const currentEnvMap = new Map(Object.entries(dotenv.parse(envFileContent)));
  const { envDiff } = Array.from(envMap.entries()).reduce(
    (envs, [key, value]) => {
      const { currentEnvMap, envDiff } = envs;

      if (!currentEnvMap.has(key)) {
        envDiff.set(key, value);
      }

      return envs;
    },
    {
      currentEnvMap,
      /**
       * @type {Map<string, unknown>}
       */
      envDiff: new Map(),
    }
  );

  if (!envDiff.size) {
    return;
  }

  const envDiffString = Array.from(envDiff.entries())
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("\n");

  fse.appendFileSync(envFilePath, `\n${envDiffString}`);
}

/**
 * Create a local production env file
 * to run bundle analyzer on build,
 * but not on deploy.
 * @param {string} envProdFilePath
 */
function setupProdEnvFile(envProdFilePath) {
  const prodEnv = {
    NODE_ENV: "production",
    ANALYZE: true
  }
  const envString = Object.entries(prodEnv).map(([key, value]) => { return `${key}=${value}` }).join("\n")

  fse.writeFileSync(envProdFilePath, envString);
}

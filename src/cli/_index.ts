import { IS_DEVELOPMENT } from "#environment/derived";
import { ProjectError } from "#lib/errors";
import { program } from "./lib";

if (!IS_DEVELOPMENT) {
  throw new ProjectError("This tool can be only run in development mode.");
}

program.parse();

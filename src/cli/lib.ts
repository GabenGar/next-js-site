import { Command } from "commander";
import { startCodegen } from "./commands/codegen";
import { resetDB } from "./commands/reset-db";
import { wipeDB } from "./commands/wipe-db";

/**
 * @TODO separate CLI tool.
 */
export const program = new Command();

program.name("project").description("Project's CLI.").version("0.1.0");

const codegenCommand = program.command("codegen");

codegenCommand.description("Everything codegen-related.").action(startCodegen);

const dbCommand = program.command("database");

dbCommand.description("Database management.");

dbCommand
  .command("reset")
  .description(
    "Resets the database and the state of the tables without dropping them."
  )
  .action(resetDB);

dbCommand
  .command("wipe")
  .description(
    "Drops all project tables and non-default schemas including migrations ones."
  )
  .action(wipeDB);

/*
  Doing this so I could rung `ts-node` with local `.env` file
  but also build in nextJS.
*/
const path = require("path");
const { config } = require("dotenv");

config({
  path: path.resolve(process.cwd(), ".env.local"),
});

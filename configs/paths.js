const path = require("node:path");

const ROOT_DIR = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT_DIR, "build");
const SRC_DIR = path.join(ROOT_DIR, "src");

const BASE_RULES_FILE = path.join(SRC_DIR, "base-rules.js");
const PRETTIER_SPECIAL_RULES_FILE = path.join(
  SRC_DIR,
  "prettier-special-rules.js"
);

module.exports = {
  ROOT_DIR,
  BUILD_DIR,
  SRC_DIR,
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
};

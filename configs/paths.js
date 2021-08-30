const { join } = require("path");

const ROOT_DIR = join(__dirname, "..");
const BUILD_DIR = join(ROOT_DIR, "build");
const SRC_DIR = join(ROOT_DIR, "src");

const BASE_RULES_FILE = join(SRC_DIR, "base-rules.js");
const PRETTIER_SPECIAL_RULES_FILE = join(SRC_DIR, "prettier-special-rules.js");

module.exports = {
  ROOT_DIR,
  BUILD_DIR,
  SRC_DIR,
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
};

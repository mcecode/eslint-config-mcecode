const { join } = require("path");

const RULES_DIR = join(__dirname, "rules");
const rules = {
  ...require(join(RULES_DIR, "base-rules")),
  ...require(join(RULES_DIR, "prettier-special-rules"))
};

module.exports = {
  env: {
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules,
  reportUnusedDisableDirectives: true
};

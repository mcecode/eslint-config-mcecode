const {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync
} = require("fs");
const { join } = require("path");
const {
  ROOT_DIR,
  BUILD_DIR,
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
} = require("../configs/paths");

const FILES_TO_COPY_FROM_ROOT_DIR = [
  { name: "CHANGELOG.md" },
  { name: "LICENSE" },
  { name: "README.md" },
  { name: "package-real.json", newName: "package.json" }
];

const CONFIGS_TO_GENERATE_FROM_RULES_DIR = [
  {
    name: "index.js",
    rules: {
      ...require(BASE_RULES_FILE),
      ...require(PRETTIER_SPECIAL_RULES_FILE)
    }
  }
];

if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true });
}

mkdirSync(BUILD_DIR);

FILES_TO_COPY_FROM_ROOT_DIR.forEach((file) => {
  copyFileSync(
    join(ROOT_DIR, file.name),
    join(BUILD_DIR, file.newName ?? file.name)
  );
});

CONFIGS_TO_GENERATE_FROM_RULES_DIR.forEach((config) => {
  writeFileSync(
    join(BUILD_DIR, config.name),
    `module.exports=${JSON.stringify({ rules: config.rules })}`
  );
});

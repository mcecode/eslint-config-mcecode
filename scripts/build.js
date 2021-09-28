const fs = require("node:fs");
const path = require("node:path");

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

const CONFIGS_TO_GENERATE_FROM_SRC_DIR = [
  {
    name: "index.js",
    rules: {
      ...require(BASE_RULES_FILE),
      ...require(PRETTIER_SPECIAL_RULES_FILE)
    }
  }
];

if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true });
}

fs.mkdirSync(BUILD_DIR);

FILES_TO_COPY_FROM_ROOT_DIR.forEach((file) => {
  fs.copyFileSync(
    path.join(ROOT_DIR, file.name),
    path.join(BUILD_DIR, file.newName ?? file.name)
  );
});

CONFIGS_TO_GENERATE_FROM_SRC_DIR.forEach((config) => {
  fs.writeFileSync(
    path.join(BUILD_DIR, config.name),
    `module.exports=${JSON.stringify({ rules: config.rules })}`
  );
});

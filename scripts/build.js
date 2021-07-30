const {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync
} = require("fs");
const { join } = require("path");

const ROOT_DIR = join(__dirname, "..");
const RULES_DIR = join(ROOT_DIR, "rules");
const BUILD_DIR = join(ROOT_DIR, "build");

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
      ...require(join(RULES_DIR, "base-rules")),
      ...require(join(RULES_DIR, "prettier-special-rules"))
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

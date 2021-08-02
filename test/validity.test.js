// Destructuring default fixes: https://github.com/avajs/ava/issues/2539.
const { default: test } = require("ava");
const { ESLint } = require("eslint");
const { join } = require("path");

const RULES_DIR = join(__dirname, "..", "rules");

const eslint = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    env: {
      es2021: true,
      node: true
    },
    parserOptions: {
      ecmaVersion: "latest"
    },
    rules: {
      ...require(join(RULES_DIR, "base-rules")),
      ...require(join(RULES_DIR, "prettier-special-rules"))
    },
    reportUnusedDisableDirectives: true
  }
});

test("ESLint rules should be valid.", async (t) => {
  const [lintResults] = await eslint.lintText("");

  t.is(lintResults.messages.length, 0);
  t.is(lintResults.errorCount, 0);
});

test("ESLint should not find errors.", async (t) => {
  const [lintResults] = await eslint.lintText(`
    const one = 1;
    console.log(one);
  `);

  t.is(lintResults.messages.length, 0);
  t.is(lintResults.errorCount, 0);
  t.is(lintResults.warningCount, 0);
});

test("ESLint should find errors.", async (t) => {
  const [lintResults] = await eslint.lintText(`
    void function () { one = 1; }();
    console.log(one);
  `);

  const rulesViolated = lintResults.messages.map((message) => message.ruleId);

  t.deepEqual(
    [
      "no-void",
      "func-names",
      "no-implicit-globals",
      "max-statements-per-line",
      "no-undef",
      "no-undef"
    ],
    rulesViolated
  );
  t.is(lintResults.messages.length, 6);
  t.is(lintResults.errorCount, 5);
  t.is(lintResults.warningCount, 1);
});

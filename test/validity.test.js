// Destructuring default fixes: https://github.com/avajs/ava/issues/2539.
const { default: test } = require("ava");
const { ESLint } = require("eslint");
const {
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
} = require("../configs/paths");

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
      ...require(BASE_RULES_FILE),
      ...require(PRETTIER_SPECIAL_RULES_FILE)
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
  const [lintResults] = await eslint.lintText("label: void null;");

  const rulesViolated = lintResults.messages.map((message) => message.ruleId);

  t.deepEqual(["no-labels", "no-void"], rulesViolated);
  t.is(lintResults.messages.length, 2);
  t.is(lintResults.errorCount, 2);
});

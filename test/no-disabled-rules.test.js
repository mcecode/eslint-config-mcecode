// Destructuring default fixes: https://github.com/avajs/ava/issues/2539.
const { default: test } = require("ava");
const { format } = require("util");
const {
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
} = require("../configs/paths");

test("There should be no disabled rules.", (t) => {
  const rules = {
    ...require(BASE_RULES_FILE),
    ...require(PRETTIER_SPECIAL_RULES_FILE)
  };
  const rulesKeys = Object.keys(rules);

  const disabledRules = rulesKeys.filter((key) => {
    const { [key]: ruleValue } = rules;

    return (
      ruleValue === "off" ||
      ruleValue === 0 ||
      (Array.isArray(ruleValue) &&
        (ruleValue[0] === "off" || ruleValue[0] === 0))
    );
  });

  if (disabledRules.length !== 0) {
    t.fail(`Disabled rules found: ${format("%O", disabledRules)}`);
  }

  t.pass();
});

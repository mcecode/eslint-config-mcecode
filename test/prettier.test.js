// Destructuring default fixes https://github.com/avajs/ava/issues/2539
const { default: test } = require("ava");
const { format } = require("util");
const {
  BASE_RULES_FILE,
  PRETTIER_SPECIAL_RULES_FILE
} = require("../configs/paths");

test("Base rules should have no conflicts with prettier rules.", (t) => {
  const baseRules = Object.keys(require(BASE_RULES_FILE));
  const prettierRules = Object.keys(require("eslint-config-prettier").rules);

  const conflicts = baseRules.filter((rule) => prettierRules.includes(rule));

  if (conflicts.length !== 0) {
    t.fail(`Conflict with prettier rules found: ${format("%O", conflicts)}`);
  }

  t.pass();
});

test("Prettier special rules used should be valid.", (t) => {
  // 'no-mixed-operators' is not used and also cannot be tested, see:
  // https://github.com/prettier/eslint-config-prettier#no-mixed-operators
  // 'max-len', 'no-unexpected-multiline', and 'quotes' cannot be tested but
  // usage is explained in the project's README.md.
  const {
    curly,
    "lines-around-comment": linesAroundComment,
    "no-confusing-arrow": noConfusingArrow,
    "no-tabs": noTabs
  } = require(PRETTIER_SPECIAL_RULES_FILE);

  // 'curly' uses 'all' as its default option so it is not necessary to check
  // whether its error level is set higher than '0' or 'off', see:
  // https://eslint.org/docs/rules/curly#options
  const errorLevelErrorMessage =
    "The error level of 'lines-around-comment', 'no-confusing-arrow', and " +
    "'no-tabs' should not be set higher than '0' or 'off' without proper " +
    "options.";
  [linesAroundComment, noConfusingArrow, noTabs].forEach((rule) => {
    t.not(rule, "error", errorLevelErrorMessage);
    t.not(rule, 2, errorLevelErrorMessage);
    t.not(rule, "warn", errorLevelErrorMessage);
    t.not(rule, 1, errorLevelErrorMessage);
  });

  if (Array.isArray(curly)) {
    const [, curlyOption] = curly;

    t.not(curlyOption, "multi-line");
    t.not(curlyOption, "multi-or-nest");
  }

  if (Array.isArray(linesAroundComment)) {
    const [, linesAroundCommentOption] = linesAroundComment;
    t.not(linesAroundCommentOption, undefined);

    const {
      beforeBlockComment,
      beforeLineComment,
      allowBlockStart,
      allowObjectStart,
      allowArrayStart
    } = linesAroundCommentOption;
    // 'beforeBlockComment' is true by default so it will still take into
    // effect even if it is not set, see:
    // https://eslint.org/docs/rules/lines-around-comment#options
    if (
      typeof beforeBlockComment === "undefined" ||
      beforeBlockComment === true ||
      beforeLineComment === true
    ) {
      t.true(allowBlockStart);
      t.true(allowObjectStart);
      t.true(allowArrayStart);
    }

    const {
      afterBlockComment,
      afterLineComment,
      allowBlockEnd,
      allowObjectEnd,
      allowArrayEnd
    } = linesAroundCommentOption;
    if (afterBlockComment === true || afterLineComment === true) {
      t.true(allowBlockEnd);
      t.true(allowObjectEnd);
      t.true(allowArrayEnd);
    }
  }

  if (Array.isArray(noConfusingArrow)) {
    const [, noConfusingArrowOption] = noConfusingArrow;
    t.not(noConfusingArrowOption, undefined);

    const { allowParens } = noConfusingArrowOption;
    t.false(allowParens);
  }

  if (Array.isArray(noTabs)) {
    const [, noTabsOption] = noTabs;
    t.not(noTabsOption, undefined);

    const { allowIndentationTabs } = noTabsOption;
    t.true(allowIndentationTabs);
  }
});

module.exports = {
  // Possible problems
  "array-callback-return": ["error", { checkForEach: true }],
  "constructor-super": "error",
  "for-direction": "error",
  "getter-return": "error",
  "no-async-promise-executor": "error",
  "no-await-in-loop": "warn",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": ["error", "always"],
  "no-const-assign": "error",
  "no-constant-binary-expression": "error",
  "no-constant-condition": "error",
  "no-constructor-return": "error",
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-dupe-args": "error",
  "no-dupe-class-members": "error",
  "no-dupe-else-if": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-duplicate-imports": "error",
  "no-empty-character-class": "error",
  "no-empty-pattern": "error",
  "no-ex-assign": "error",
  "no-fallthrough": ["error", { commentPattern: ".+" }],
  "no-func-assign": "error",
  "no-import-assign": "error",
  "no-inner-declarations": "error",
  "no-invalid-regexp": "error",
  "no-irregular-whitespace": ["error", { skipStrings: false }],
  "no-loss-of-precision": "error",
  "no-misleading-character-class": "error",
  "no-new-native-nonconstructor": "error",
  "no-new-symbol": "error",
  "no-obj-calls": "error",
  "no-promise-executor-return": "error",
  "no-prototype-builtins": "error",
  "no-self-assign": "error",
  "no-self-compare": "error",
  "no-setter-return": "error",
  "no-sparse-arrays": "error",
  "no-template-curly-in-string": "warn",
  "no-this-before-super": "error",
  "no-undef": ["error", { typeof: true }],
  "no-unmodified-loop-condition": "error",
  "no-unreachable": "error",
  "no-unreachable-loop": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
  "no-unsafe-optional-chaining": [
    "error",
    { disallowArithmeticOperators: true }
  ],
  "no-unused-private-class-members": "error",
  "no-unused-vars": "error",
  "no-use-before-define": ["error", "nofunc"],
  "no-useless-backreference": "error",
  "require-atomic-updates": "error",
  "use-isnan": ["error", { enforceForIndexOf: true }],
  "valid-typeof": "error",

  // Suggestions
  "arrow-body-style": "error",
  camelcase: "error",
  "capitalized-comments": [
    "error",
    "always",
    { ignoreInlineComments: true, ignoreConsecutiveComments: true }
  ],
  "consistent-return": "warn",
  "consistent-this": "error",
  "default-case": ["error", { commentPattern: ".+" }],
  "default-case-last": "error",
  "default-param-last": "error",
  "dot-notation": "warn",
  eqeqeq: "error",
  "func-name-matching": ["error", { considerPropertyDescriptor: true }],
  "func-names": ["error", "as-needed"],
  "func-style": ["error", "declaration"],
  "grouped-accessor-pairs": ["error", "setBeforeGet"],
  "guard-for-in": "warn",
  "max-classes-per-file": "error",
  "max-depth": ["warn", 3],
  "max-nested-callbacks": ["warn", 3],
  "max-params": "warn",
  "multiline-comment-style": ["error", "separate-lines"],
  "new-cap": "error",
  "no-alert": "error",
  "no-array-constructor": "error",
  "no-bitwise": "warn",
  "no-caller": "error",
  "no-case-declarations": "error",
  "no-delete-var": "error",
  "no-div-regex": "warn",
  "no-else-return": ["error", { allowElseIf: false }],
  "no-empty": "error",
  "no-empty-function": "error",
  "no-eq-null": "error",
  "no-eval": "error",
  "no-extend-native": "warn",
  "no-extra-bind": "error",
  "no-extra-boolean-cast": ["error", { enforceForLogicalOperands: true }],
  "no-global-assign": "error",
  "no-implicit-globals": ["error", { lexicalBindings: true }],
  "no-implied-eval": "error",
  "no-invalid-this": "error",
  "no-iterator": "error",
  "no-labels": "error",
  "no-lone-blocks": "error",
  "no-lonely-if": "error",
  "no-loop-func": "error",
  "no-multi-assign": "error",
  "no-multi-str": "error",
  "no-negated-condition": "error",
  "no-nested-ternary": "warn",
  "no-new": "error",
  "no-new-func": "error",
  "no-new-object": "error",
  "no-new-wrappers": "error",
  "no-nonoctal-decimal-escape": "error",
  "no-octal": "error",
  "no-octal-escape": "error",
  "no-param-reassign": "error",
  "no-proto": "error",
  "no-regex-spaces": "error",
  "no-restricted-syntax": ["error", "SequenceExpression"],
  "no-return-assign": ["error", "always"],
  "no-return-await": "error",
  "no-script-url": "error",
  "no-shadow": ["error", { builtinGlobals: true, hoist: "all" }],
  "no-shadow-restricted-names": "error",
  "no-throw-literal": "error",
  "no-undef-init": "error",
  "no-unneeded-ternary": ["error", { defaultAssignment: false }],
  "no-unused-expressions": "error",
  "no-useless-call": "error",
  "no-useless-catch": "error",
  "no-useless-computed-key": ["error", { enforceForClassMembers: true }],
  "no-useless-concat": "error",
  "no-useless-constructor": "error",
  "no-useless-escape": "error",
  "no-useless-rename": "error",
  "no-useless-return": "error",
  "no-var": "error",
  "no-void": "error",
  "no-with": "error",
  "object-shorthand": ["error", "always", { avoidExplicitReturnArrows: true }],
  "one-var": ["error", "never"],
  "prefer-arrow-callback": "error",
  "prefer-const": [
    "error",
    { destructuring: "all", ignoreReadBeforeAssign: true }
  ],
  "prefer-destructuring": [
    "error",
    { object: true, array: true },
    { enforceForRenamedProperties: true }
  ],
  "prefer-exponentiation-operator": "error",
  "prefer-named-capture-group": "error",
  "prefer-numeric-literals": "error",
  "prefer-object-spread": "error",
  "prefer-promise-reject-errors": "error",
  "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
  "prefer-rest-params": "error",
  "prefer-spread": "error",
  "prefer-template": "error",
  radix: ["error", "as-needed"],
  "require-await": "warn",
  "require-unicode-regexp": "warn",
  "require-yield": "error",
  "sort-imports": ["error", { allowSeparatedGroups: true }],
  "spaced-comment": "error",
  "symbol-description": "error",
  yoda: "error",

  // Layout and formatting
  "line-comment-position": "error",
  "lines-between-class-members": "error",
  "max-statements-per-line": "warn"
};

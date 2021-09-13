# eslint-config-mcecode

An opinionated set of [ESLint](https://github.com/eslint/eslint) rules that work with [Prettier](https://github.com/prettier/prettier) out of the box.

**Note:** This package only ships rules, you would still need to set [`env` and other configs](https://eslint.org/docs/user-guide/configuring) to properly tell ESLint how you want it to analyze your code, so that it knows what to expect, such as what global variables you will be using.

## Requirements

This package requires ESLint version 7.15.0 or later. It also assumes that you are working in an ECMAScript 6 or later environment.

## Installation

```console
npm install --save-dev eslint-config-mcecode
```

**Note:** This package lists ESLint as a peer dependency as [they instructed when creating shareable configs](https://eslint.org/docs/developer-guide/shareable-configs#publishing-a-shareable-config). When installing packages, [npm versions before version 7 do not install peer dependencies by default](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies), so you would still need to install ESLint as a separate dependency when using npm version 6 or lower.

## Usage

[Extend](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files) this package by adding it to your `.eslintrc.*` file or in the `eslintConfig` property of your `package.json`.

In your `.eslintrc.js` or `.eslintrc.cjs`:

```js
module.exports = {
  extends: "mcecode"
};
```

In your `.eslintrc.yaml` or `.eslintrc.yml`:

```yaml
extends: mcecode
```

In your `.eslintrc.json`:

```json
{
  "extends": "mcecode"
}
```

In your `package.json`:

```json
{
  "eslintConfig": {
    "extends": "mcecode"
  }
}
```

## Caveats

### When using with other ESLint configs

To work with Prettier, this package does not turn on any rules that may conflict with Prettier. It does not turn off rules. This means that if you plan to use it with other configs, you may still need to use [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off any rules that those packages turn on that may conflict with Prettier. However, [as will be discussed next](#when-using-with-prettier), this package enables special rules. These rules may be turned off if used with eslint-config-prettier. To prevent this, put this config at the end of your `extends` array.

In your `.eslintrc.json`:

```jsonc
{
  "extends": [
    // ...other configs
    "prettier",
    "mcecode"
  ]
}
```

### When using with Prettier

Most of the [special rules](https://github.com/prettier/eslint-config-prettier#special-rules) that this package enables work well with Prettier out of the box. However, there are some which may conflict with prettier if not addressed. Below are some gotchas about them.

#### `max-len`

[ESLint docs](https://eslint.org/docs/rules/max-len) | [Prettier docs](https://github.com/prettier/eslint-config-prettier#max-len)

**Note:** There is no need to worry about this rule if you will not change [Prettier's default `printWidth` option](https://prettier.io/docs/en/options.html#print-width).

Prettier sets a soft line limit for code and cannot format long strings, regular expressions, comments, and other things that need to be broken up by a human. This package enables the `max-len` rule to enforce a hard limit. It sets a maximum line length of 100 for code and 80 for comments while ignoring URLs.

This means that when using this package, you should set Prettier's `printWidth` option to a value less than 100.

In your `.prettierrc.json`:

```json
{
  "printWidth": 90
}
```

Additionally, you may turn this rule off if you do not wish to set hard limits on line length.

In your `.eslintrc.json`:

```json
{
  "rules": {
    "max-len": "off"
  }
}
```

#### `no-unexpected-multiline`

[ESLint docs](https://eslint.org/docs/rules/no-unexpected-multiline) | [Prettier docs](https://github.com/prettier/eslint-config-prettier#no-unexpected-multiline)

There are some edge cases that you may run into where Prettier's formatting may conflict with this rule. Please refer to Prettier's documentation linked above which explains those edge cases and how to mitigate them.

If you do not want to deal with or risk running into those edge cases, you can turn this rule off.

In your `.eslintrc.json`:

```json
{
  "rules": {
    "no-unexpected-multiline": "off"
  }
}
```

#### `quotes`

[ESLint docs](https://eslint.org/docs/rules/quotes) | [Prettier docs](https://github.com/prettier/eslint-config-prettier#quotes)

**Note:** There is no need to worry about this rule if you will not change [Prettier's default `singleQuote` option](https://prettier.io/docs/en/options.html#quotes).

This package enables this rule to enforce double (") quotes and to forbid backticks (`) where regular strings could have been used.

If you wish to use single (') quotes or backticks for strings, you can set your config to support that based on the ESLint documentation linked above. You may also choose to turn this rule off.

In your `.eslintrc.json`:

```json
{
  "rules": {
    "quotes": "off"
  }
}
```

### Special comments

ESLint allows disabling rule warnings using [configuration comments](https://eslint.org/docs/user-guide/configuring/rules#using-configuration-comments-1) such as `/* eslint-disable no-empty */`. This package enables rules whose warnings can be suppressed using regular comments that can help provide more context than just turning off the rule.

The following are the said rules:

- [`no-empty`](https://eslint.org/docs/rules/no-empty)
- [`no-empty-function`](https://eslint.org/docs/rules/no-empty-function)
- [`default-case`](https://eslint.org/docs/rules/default-case)
- [`no-fallthrough`](https://eslint.org/docs/rules/no-fallthrough)

Below are examples of how to suppress their warnings using meaningful comments.

Instead of disabling `no-empty` or `no-empty-function`, you can explain why they are empty:

```js
try {
  throw new Error();
} catch {
  // This does not need to be handled because...
}

function doSomething() {
  // TODO: Do something with...
}
```

Instead of disabling `default-case` or `no-fallthrough`, you can state why fall through behavior or not putting a default case is intended:

```js
switch (key) {
  case 1: {
    // Some code
    // This needs to fall through because...
  }

  case 2: {
    // Some code that can run on its own but should run after the previous case
    break;
  }

  // There is no default case because...
}
```

## Contributing

If you find anything wrong or would like to suggest changes, issues and pull requests are welcome.

The [`rules`](rules) directory contains the files that would most likely be of interest to you. The following are the files:

- [`base-rules.js`](rules/base-rules.js) contains rules that should not conflict with Prettier
- [`prettier-special-rules.js`](rules/prettier-special-rules.js) contains rules that may conflict with Prettier, [as discussed earlier](#when-using-with-prettier)

Be sure to find and fix any errors before you submit a pull request by running the following commands.

Install dev dependencies:

```console
npm install
```

Test if the rules you added or changed are valid:

```console
npm test
```

Lint the code for possible errors:

```console
npm run lint
```

Format the code:

```console
npm run format
```

## Versioning

This project adheres to the [Semantic Versioning 2.0 Specification](https://semver.org). However, given the nature of the project, it may be hard to determine what constitutes a major, minor, or patch release. This section aims to clarify that.

### Major

Major releases introduce changes that alter how ESLint lints your code which would most likely break tests or builds. These include:

- Adding rules and/or options that enable new behavior
- Removing options that disabled linting behavior (e.g., removing the [`ignoreUrls: true`](https://eslint.org/docs/rules/max-len#ignoreurls) option for the [`max-len`](https://eslint.org/docs/rules/max-len) rule would make ESLint start flagging lines that have long URLs, which may break tests and builds that currently pass)
- Increasing the error level of a rule (i.e., setting a rule's ID from `"warn"` to `"error"`)
- Changing the package's required ESLint version

### Minor

Minor releases introduce changes that alter how ESLint lints your code which would most likely not break tests or builds. These include:

- Removing rules
- Removing options that enabled linting behavior (e.g., removing the [`skipStrings: false`](https://eslint.org/docs/rules/no-irregular-whitespace#skipstrings) option for the [`no-irregular-whitespace`](https://eslint.org/docs/rules/no-irregular-whitespace) rule would stop ESLint from checking strings with irregular whitespace characters, which may pass tests and builds that currently fail)
- Decreasing the error level of a rule (i.e., setting a rule's ID from `"error"` to `"warn"`)

### Patch

Patch releases introduce changes that do not alter how ESLint lints your code. These include:

- Removing redundant rules and/or options (e.g., setting the [`defaultAssignment`](https://eslint.org/docs/rules/no-unneeded-ternary#defaultassignment) option to `true` for the [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary) rule is unnecessary and does not do anything because it is the default option, therefore, it can be removed without changing ESLint's behavior)

## License

Copyright 2021-present Matthew Espino

This project is licensed under the [Apache 2.0 license](LICENSE).

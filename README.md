# yarn-lock-dedupe

[![Build Status](https://img.shields.io/travis/fanatid/yarn-lock-dedupe.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/yarn-lock-dedupe)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

  - [What this is it?](#what-this-is-it)
  - [Installation](#installation)
  - [Examples](#examples)
    - [Dedupe in JS](#dedupe-in-js)
    - [Dedupe in CLI](#dedupe-in-cli)
  - [LICENSE](#license)

## What this is it?

[Yarn](https://yarnpkg.com/) is awesome. When Yarn was released and introduced lockfile this was fresh gap of air. No need worry about changes in dependencies anymore, they are really freezed. No more hacks with [npm-shrinkwrap.json](https://docs.npmjs.com/files/shrinkwrap.json).

From other side, when we add new dependency to our project, dependencies of dependencies are not updated. If new version of these dependencies of dependencies was released it means that we can receive two (or more) different versions of dependencies.

In project on which I worked few years ago, currently 3 different [nan](https://github.com/nodejs/nan) versions in `yarn.lock`. That's happened because packages which require `nan` was installed in different time. On first installation latest version was `2.5.1`, on last installation latest was already `2.14.0`. And all they in lockfile, because nothing can be removed from lockfile on adding new dependencies.

I created `yarn-lock-dedupe` for removing such extra dependencies. Lockfile parsed with [@yarnpkg/lockfile](https://www.npmjs.com/package/@yarnpkg/lockfile), from all satisfied dependencies only latest remains in resulted lockfile.

## Installation

[npm](https://www.npmjs.com/):

```bash
npm install https://github.com/fanatid/yarn-lock-dedupe --global
```

[yarn](https://yarnpkg.com/):

```bash
yarn global add https://github.com/fanatid/yarn-lock-dedupe
```

By default `npm` / `yarn` will install code from `master` branch. If you want specified version, just add some branch name / commit hash / tag and the end of URL. See [Yarn add](https://yarnpkg.com/lang/en/docs/cli/add/) or [npm install](https://docs.npmjs.com/cli/install) for details about installing package from git repo.

## Examples

#### Dedupe in JS

```js
const fs = require('fs')
const dedupe = require('yarn-lock-dedupe')

const content = fs.readFileSync('yarn.lock', 'utf8')
fs.writeFileSync('yarn.lock', dedupe(content), 'utf8')
```

#### Dedupe in CLI

```bash
$ yarn-lock-dedupe --help
Usage: yarn-lock-dedupe [options]

Options:
  --version       Show version number                                  [boolean]
  --filename, -f  path to yarn.lock                          [string] [required]
  --rewrite, -r   rewrite yarn.lock                   [boolean] [default: false]
  --help, -h      Show help                                            [boolean]
$ yarn-lock-dedupe -f ./yarn.lock -r
```

## LICENSE [MIT](LICENSE)

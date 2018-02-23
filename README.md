# yarn-lock-cleaner

[![Build Status](https://img.shields.io/travis/fanatid/yarn-lock-cleaner/issues.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/yarn-lock-cleaner/issues)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

**You use it on own risk**

If you checked yarn file sometimes, you can see packages with same name, but with different versions.

This is because this package is dependency in different packages.

And all is ok, when dependecies are: `package@^1.0.0` & `package@^2.0.0`.

But what if dependencies will be `package@^1.2.3` & `package@^1.2.4` and package with dependency `^1.2.4` will be installed after first?.

You can see something like this:

```
prop-types@^15.5.10:
  version "15.5.10"
  resolved "https://registry.yarnpkg.com/prop-types/-/prop-types-15.5.10.tgz#2797dfc3126182e3a95e3dfbb2e893ddd7456154"
...
prop-types@^15.5.8:
  version "15.8.0"
  resolved "https://registry.yarnpkg.com/prop-types/-/prop-types-15.6.0.tgz#ceaf083022fc46b4a35f69e13ef75aed0d639856"
```

what can be transformed to

```
prop-types@^15.5.8, prop-types@^15.5.10:
  version "15.8.0"
  resolved "https://registry.yarnpkg.com/prop-types/-/prop-types-15.6.0.tgz#ceaf083022fc46b4a35f69e13ef75aed0d639856"
```

without any regression (probably).

## Usage

- transfor function exported by default
- CLI

## LICENSE

This library is free and open-source software released under the MIT license.

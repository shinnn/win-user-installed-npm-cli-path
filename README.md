# win-user-installed-npm-cli-path

[![NPM version](https://img.shields.io/npm/v/win-user-installed-npm-cli-path.svg)](https://www.npmjs.com/package/win-user-installed-npm-cli-path)
[![Build Status](https://travis-ci.org/shinnn/win-user-installed-npm-cli-path.svg?branch=master)](https://travis-ci.org/shinnn/win-user-installed-npm-cli-path)
[![Build status](https://ci.appveyor.com/api/projects/status/2sp4jxe2rp48lnk2/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/win-user-installed-npm-cli-path/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/win-user-installed-npm-cli-path.svg)](https://coveralls.io/github/shinnn/win-user-installed-npm-cli-path)
[![Dependency Status](https://david-dm.org/shinnn/win-user-installed-npm-cli-path.svg)](https://david-dm.org/shinnn/win-user-installed-npm-cli-path)
[![devDependency Status](https://david-dm.org/shinnn/win-user-installed-npm-cli-path/dev-status.svg)](https://david-dm.org/shinnn/win-user-installed-npm-cli-path#info=devDependencies)

Resolve the path of [`npm-cli.js`][npm-cli] included in [user-installed](https://docs.npmjs.com/getting-started/installing-node#updating-npm) [npm](https://www.npmjs.com/) on [Windows](https://www.microsoft.com/windows)

```javascript
const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

winUserInstalledNpmCliPath().then(cliPath => {
  cliPath; //=> 'C:\\Users\\me\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install win-user-installed-npm-cli-path
```

## API

```javascript
const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');
```

### winUserInstalledNpmCliPath()

Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It resolves the path of [`npm-cli.js`][npm-cli] included in the user-installed [`npm`](https://github.com/npm/npm) CLI on Windows. *"User-installed"* means that it has been installed with [`npm install -g npm`](https://docs.npmjs.com/misc/faq#how-do-i-update-npm) command by the user, and it might be located on the path different from where the default Node-bundled npm has been installed.

It uses global [`prefix`](https://docs.npmjs.com/files/folders#prefix-configuration) [config](https://docs.npmjs.com/misc/config#prefix) as a base path for searching npm CLI location.

*Use [npm](https://github.com/npm/npm/releases) 2.x or newer to avoid [the `prefix` bug in ancient versions](https://github.com/npm/npm/wiki/Troubleshooting#a-brief-note-on-the-built-in-windows-configuration).*

```javascript
// npm config set prefix tmp --global

const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

winUserInstalledNpmCliPath().then(cliPath => {
  cliPath; //=> 'C:\projects\your_project\tmp\node_modules\npm\bin\npm-cli.js'
});
```

## For [POSIX](http://standards.ieee.org/develop/wg/POSIX.html)

Use [real-executable-path](https://github.com/shinnn/real-executable-path) instead.

```javascript
const realExecutablePath = require('real-executable-path');

realExecutablePath('npm').then(cliPath) => {
  cliPath; //=> '/usr/local/lib/node_modules/npm/bin/npm-cli.js'
});
```

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[npm-cli]: https://github.com/npm/npm/blob/master/bin/npm-cli.js

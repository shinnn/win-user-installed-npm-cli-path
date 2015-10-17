'use strict';

var path = require('path');

var test = require('tape');
var semver = require('semver');
var winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when npm is installed with `npm install -g npm`', function(t) {
  t.plan(3);

  t.strictEqual(
    winUserInstalledNpmCliPath.name,
    'winUserInstalledNpmCliPath',
    'should have a function name.'
  );

  winUserInstalledNpmCliPath()
  .then(function(result) {
    if (semver.lt(process.env.npm_version, '2.0.0')) {
      t.strictEqual(
        result,
        path.join(process.env['ProgramFiles(x86)'], 'nodejs\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` path.'
      );

      t.notEqual(
        require(path.join(result, '..\\..\\package.json')).version,
        process.env.npm_version,
        'should not resolve the path from where the npm installed with an ancient version exists.'
      );

      return;
    }

    t.strictEqual(
      result,
      path.join(process.env.APPDATA, 'npm\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` path.'
    );

    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.npm_version,
      'should resolve the path from where user-installed npm exists.'
    );
  }).catch(t.fail);
});

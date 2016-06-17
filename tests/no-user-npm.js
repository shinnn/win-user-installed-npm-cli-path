'use strict';

const path = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when npm is not installed with `npm install -g npm`', t => {
  t.plan(3);

  winUserInstalledNpmCliPath()
  .then(t.fail, err => {
    t.strictEqual(
      err.code,
      'ENOENT',
      'should be rejected with an `ENOENT` error.'
    );

    t.strictEqual(
      err.path,
      path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
      'should include a file path to the error.'
    );

    t.ok(
      /lstat .*\\tmp\\node_modules\\npm\\bin\\npm-cli\.js/.test(err.message),
      'should be rejected while calling `lstat`.'
    );
  })
  .catch(t.fail);
});

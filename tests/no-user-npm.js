'use strict';

const {join} = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when npm is not installed with `npm install -g npm`', t => {
  t.plan(3);

  winUserInstalledNpmCliPath()
  .then(t.fail, ({code, message, path}) => {
    t.strictEqual(code, 'ENOENT', 'should be rejected with an `ENOENT` error.');

    t.strictEqual(
      path,
      join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
      'should include a file path to the error.'
    );

    t.ok(
      /lstat .*\\tmp\\node_modules\\npm\\bin\\npm-cli\.js/.test(message),
      'should be rejected while calling `lstat`.'
    );
  })
  .catch(t.fail);
});

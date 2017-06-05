'use strict';

const {join} = require('path');

const fs = require('graceful-fs');
const pify = require('pify');
const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

const {mkdir, unlink} = pify(fs);

test('winUserInstalledNpmCliPath() when a non-file entity exists in the expected path', t => {
  t.plan(1);

  const cliPath = join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

  unlink(cliPath)
  .then(() => mkdir(cliPath))
  .then(() => winUserInstalledNpmCliPath())
  .then(t.fail, err => {
    t.strictEqual(
      err.message,
      `${cliPath} exists, but it's not a file.`,
      'should be rejected.'
    );
  })
  .catch(t.fail);
});

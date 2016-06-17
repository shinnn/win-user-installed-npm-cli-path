'use strict';

const path = require('path');

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('win32');

process.env.PATH = path.resolve('f/o/o/b/a/r');

test('winUserInstalledNpmCliPath() when npm is not installed', t => {
  t.plan(2);

  const winUserInstalledNpmCliPath = require('..');

  winUserInstalledNpmCliPath().then(t.fail, err => {
    t.ok(err.code, 'should be rejected with a command error.');

    t.ok(
      /npm config get prefix/.test(err.cmd),
      'should be rejected while running `npm config` command.'
    );
  });
});

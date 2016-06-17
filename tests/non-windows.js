'use strict';

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('darwin');

test('winUserInstalledNpmCliPath() on non-Windows environment', t => {
  t.plan(2);

  const winUserInstalledNpmCliPath = require('..');

  t.strictEqual(
    winUserInstalledNpmCliPath.name,
    'winUserInstalledNpmCliPath',
    'should have a function name.'
  );

  winUserInstalledNpmCliPath().then(t.fail, err => {
    t.strictEqual(err.message, 'Only supported in Windows.', 'should fail immediately.');
  });
});

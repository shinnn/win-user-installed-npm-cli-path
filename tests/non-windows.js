'use strict';

var pretendPlatform = require('pretend-platform');
var test = require('tape');

pretendPlatform('darwin');

test('winUserInstalledNpmCliPath() on non-Windows environment', function(t) {
  t.plan(2);

  var winUserInstalledNpmCliPath = require('..');

  t.strictEqual(
    winUserInstalledNpmCliPath.name,
    'winUserInstalledNpmCliPath',
    'should have a function name.'
  );

  winUserInstalledNpmCliPath().then(t.fail, function(err) {
    t.strictEqual(err.message, 'Only supported in Windows.', 'should fail immediately.');
  });
});

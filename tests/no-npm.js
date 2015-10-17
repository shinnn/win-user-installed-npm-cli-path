'use strict';

var path = require('path');

var pretendPlatform = require('pretend-platform');
var semver = require('semver');
var test = require('tape');

pretendPlatform('win32');

process.env.PATH = path.resolve('f/o/o/b/a/r');

var ltNode012 = semver.lt(process.version, '0.12.0');

test('winUserInstalledNpmCliPath() when npm is not installed', function(t) {
  if (ltNode012) {
    t.plan(1);
  } else {
    t.plan(2);
  }

  var winUserInstalledNpmCliPath = require('..');

  winUserInstalledNpmCliPath().then(t.fail, function(err) {
    t.ok(err.code, 'should be rejected with a command error.');

    if (ltNode012) {
      return;
    }

    t.ok(
      /npm config get prefix/.test(err.cmd),
      'should be rejected while running `npm config` command.'
    );
  });
});

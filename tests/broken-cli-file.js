'use strict';

var path = require('path');

var fs = require('graceful-fs');
var pify = require('pify');
var PinkiePromise = require('pinkie-promise');
var test = require('tape');
var winUserInstalledNpmCliPath = require('..');

var fsP = pify(fs, PinkiePromise);

test('winUserInstalledNpmCliPath() when a non-file entity exists in the expected path', function(t) {
  t.plan(1);

  var cliPath = path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

  fsP.unlink(cliPath)
  .then(function() {
    return fsP.mkdir(cliPath);
  }).then(function() {
    return winUserInstalledNpmCliPath();
  })
  .then(t.fail, function(err) {
    t.strictEqual(
      err.message,
      cliPath + ' exists, but it\'s not a file.',
      'should be rejected.'
    );
  })
  .catch(t.fail);
});

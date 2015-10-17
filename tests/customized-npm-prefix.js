'use strict';

var path = require('path');

var test = require('tape');
var winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() with non-default npm `prefix`', function(t) {
  t.plan(2);

  winUserInstalledNpmCliPath()
  .then(function(result) {
    t.strictEqual(
      result,
      path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` path.'
    );

    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.another_npm_version,
      'should find the file under the customized `prefix` path.'
    );
  })
  .catch(t.fail);
});

'use strict';

const path = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() with non-default npm `prefix`', t => {
  t.plan(2);

  winUserInstalledNpmCliPath()
  .then(result => {
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

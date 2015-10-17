/*!
 * win-user-installed-npm-cli-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/win-user-installed-npm-cli-path
*/
'use strict';

var exec = require('child_process').exec;
var path = require('path');

var fs = require('graceful-fs');
var PinkiePromise = require('pinkie-promise');

if (process.platform !== 'win32') {
  module.exports = function winUserInstalledNpmCliPath() {
    return PinkiePromise.reject(new Error('Only supported in Windows.'));
  };
} else {
  var getNpmPrefix = new PinkiePromise(function(resolve, reject) {
    // https://github.com/npm/npm/blob/v3.4.0/bin/npm.cmd
    // https://github.com/npm/npm/pull/9089
    exec('npm config get prefix -g', function execCallback(execErr, stdout) {
      if (execErr) {
        reject(execErr);
        return;
      }

      resolve(stdout.trim());
    });
  });

  module.exports = function winUserInstalledNpmCliPath() {
    return getNpmPrefix.then(function(npmPrefix) {
      return new PinkiePromise(function executor(resolve, reject) {
        var expectedPath = path.join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');

        fs.lstat(expectedPath, function lstatCallback(lstatErr, stats) {
          if (lstatErr) {
            reject(lstatErr);
            return;
          }

          if (!stats.isFile()) {
            reject(new Error(expectedPath + ' exists, but it\'s not a file.'));
            return;
          }

          resolve(expectedPath);
        });
      });
    });
  };
}

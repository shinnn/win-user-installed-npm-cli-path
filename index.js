/*!
 * win-user-installed-npm-cli-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/win-user-installed-npm-cli-path
*/
'use strict';

const exec = require('child_process').exec;
const path = require('path');

const fs = require('graceful-fs');

if (process.platform !== 'win32') {
  module.exports = function winUserInstalledNpmCliPath() {
    return Promise.reject(new Error('Only supported in Windows.'));
  };
} else {
  const getNpmPrefix = new Promise(function executor(resolve, reject) {
    // https://github.com/npm/npm/blob/v3.10.0/bin/npm.cmd
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
      return new Promise(function executor(resolve, reject) {
        const expectedPath = path.join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');

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

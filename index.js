'use strict';

const {exec} = require('child_process');
const {lstat} = require('fs');
const {join} = require('path');

if (process.platform !== 'win32') {
	module.exports = async function winUserInstalledNpmCliPath() {
		throw new Error('Only supported in Windows.');
	};
} else {
	const getNpmPrefix = new Promise((resolve, reject) => {
		// https://github.com/npm/npm/blob/v5.6.0/bin/npm.cmd
		// https://github.com/npm/npm/pull/9089
		exec('npm prefix -g', (err, stdout) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(stdout.trim());
		});
	});

	module.exports = async function winUserInstalledNpmCliPath(...args) {
		const argLen = args.length;

		if (argLen !== 0) {
			throw new RangeError(`Expected no arguments, but got ${argLen} argument${
				argLen === 1 ? '' : 's'
			}.`);
		}

		const npmPrefix = await getNpmPrefix;

		return new Promise((resolve, reject) => {
			const expectedPath = join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');

			lstat(expectedPath, (err, stat) => {
				if (err) {
					reject(err);
					return;
				}

				if (!stat.isFile()) {
					reject(new Error(`${expectedPath} exists, but it's not a file.`));
					return;
				}

				resolve(expectedPath);
			});
		});
	};
}

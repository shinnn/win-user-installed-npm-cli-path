'use strict';

const {exec} = require('child_process');
const {lstat} = require('fs');
const {join} = require('path');
const {promisify} = require('util');

if (process.platform !== 'win32') {
	module.exports = async function winUserInstalledNpmCliPath() {
		throw new Error('Only supported on Windows.');
	};
} else {
	const getNpmPrefix = (async () => (await promisify(exec)('npm prefix -g')).stdout.trim())();

	module.exports = async function winUserInstalledNpmCliPath(...args) {
		const argLen = args.length;

		if (argLen !== 0) {
			throw new RangeError(`Expected no arguments, but got ${argLen} argument${
				argLen === 1 ? '' : 's'
			}.`);
		}

		const npmPrefix = await getNpmPrefix;
		const expectedPath = join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');
		const stat = await promisify(lstat)(expectedPath);

		if (!stat.isFile()) {
			throw new Error(`${expectedPath} exists, but it's not a file.`);
		}

		return expectedPath;
	};
}

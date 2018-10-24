'use strict';

if (process.platform !== 'win32') {
	module.exports = async function winUserInstalledNpmCliPath() {
		throw new Error('Only supported on Windows.');
	};
} else {
	const {execFile} = require('child_process');
	const {lstat} = require('fs');
	const {join} = require('path');
	const {promisify} = require('util');

	const promisifiedExecFile = promisify(execFile);
	const promisifiedLstat = promisify(lstat);

	module.exports = async function winUserInstalledNpmCliPath(...args) {
		const argLen = args.length;

		if (argLen !== 0) {
			throw new RangeError(`Expected no arguments, but got ${argLen} argument${
				argLen === 1 ? '' : 's'
			}.`);
		}

		const npmPrefix = (await promisifiedExecFile('npm', ['prefix', '-g'], {shell: true})).stdout.trim();
		const expectedPath = join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');

		if (!(await promisifiedLstat(expectedPath)).isFile()) {
			throw new Error(`${expectedPath} exists, but it's not a file.`);
		}

		return expectedPath;
	};
}

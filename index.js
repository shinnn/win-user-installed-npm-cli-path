'use strict';

if (process.platform !== 'win32') {
	module.exports = async function winUserInstalledNpmCliPath() {
		throw new Error('Only supported on Windows.');
	};
} else {
	const {execFile} = require('child_process');
	const {join} = require('path');
	const {lstat} = require('fs').promises;
	const {promisify} = require('util');

	const promisifiedExecFile = promisify(execFile);

	module.exports = async function winUserInstalledNpmCliPath(...args) {
		const argLen = args.length;

		if (argLen !== 0) {
			throw new RangeError(`Expected no arguments, but got ${argLen} argument${
				argLen === 1 ? '' : 's'
			}.`);
		}

		const npmPrefix = (await promisifiedExecFile('npm', ['prefix', '-g'], {shell: true})).stdout.trim();
		const expectedPath = join(npmPrefix, 'node_modules\\npm\\bin\\npm-cli.js');

		if (!(await lstat(expectedPath)).isFile()) {
			throw new Error(`${expectedPath} exists, but it's not a file.`);
		}

		return expectedPath;
	};
}

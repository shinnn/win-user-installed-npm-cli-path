'use strict';

const {join} = require('path');
const {promisify} = require('util');

const {mkdir, unlink} = require('fs');
const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when a non-file entity exists in the expected path', async t => {
	const cliPath = join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

	try {
		await promisify(unlink)(cliPath);
		await promisify(mkdir)(cliPath);
		await winUserInstalledNpmCliPath();
		t.fail('unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(
			message,
			`${cliPath} exists, but it's not a file.`,
			'should be rejected.'
		);
	}

	t.end();
});

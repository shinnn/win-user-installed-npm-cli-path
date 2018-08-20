'use strict';

const {join} = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when npm is not installed with `npm install -g npm`', async t => {
	try {
		await winUserInstalledNpmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch ({code, message, path}) {
		t.equal(code, 'ENOENT', 'should be rejected with an `ENOENT` error.');

		t.equal(
			path,
			join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
			'should include a file path to the error.'
		);

		t.ok(
			/lstat .*\\tmp\\node_modules\\npm\\bin\\npm-cli\.js/u.test(message),
			'should be rejected while calling `lstat`.'
		);
	}

	t.end();
});

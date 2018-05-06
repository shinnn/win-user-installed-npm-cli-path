'use strict';

const {resolve} = require('path');

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('win32');

process.env.PATH = resolve('f/o/o/b/a/r');

test('winUserInstalledNpmCliPath() when npm is not installed', async t => {
	const winUserInstalledNpmCliPath = require('..');

	try {
		await winUserInstalledNpmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch ({cmd, code}) {
		t.ok(code, 'should be rejected with a command error.');

		t.ok(
			cmd.includes('npm prefix -g'),
			'should be rejected while running `npm config` command.'
		);
	}

	t.end();
});

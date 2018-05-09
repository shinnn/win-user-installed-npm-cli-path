'use strict';

const {resolve} = require('path');

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('win32');

process.env.PATH = resolve('f/o/o/b/a/r');

test('winUserInstalledNpmCliPath() when npm is not installed', async t => {
	const winUserInstalledNpmCliPath = require('..');

	try {
		await winUserInstalledNpmCliPath(1);
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(
			message,
			'Expected no arguments, but got 1 argument.',
			'should be rejected when it takes an argument.'
		);
	}

	try {
		await winUserInstalledNpmCliPath(1, 2);
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(
			message,
			'Expected no arguments, but got 2 arguments.',
			'should be rejected when it takes arguments.'
		);
	}

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

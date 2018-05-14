'use strict';

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('darwin');

test('winUserInstalledNpmCliPath() on non-Windows environment', async t => {
	const winUserInstalledNpmCliPath = require('..');

	try {
		await winUserInstalledNpmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(message, 'Only supported on Windows.', 'should fail immediately.');
	}

	t.end();
});

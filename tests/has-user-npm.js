'use strict';

const path = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() when npm is installed with `npm install -g npm`', async t => {
	const result = await winUserInstalledNpmCliPath();

	t.equal(
		result,
		path.join(process.env.APPDATA, 'npm\\node_modules\\npm\\bin\\npm-cli.js'),
		'should resolve the `npm-cli.js` path.'
	);

	t.equal(
		require(path.join(result, '..\\..\\package.json')).version,
		process.env.npm_version,
		'should resolve the path from where user-installed npm exists.'
	);

	t.end();
});

'use strict';

const {join} = require('path');

const test = require('tape');
const winUserInstalledNpmCliPath = require('..');

test('winUserInstalledNpmCliPath() with non-default npm `prefix`', async t => {
	const result = await winUserInstalledNpmCliPath();

	t.equal(
		result,
		join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
		'should resolve the `npm-cli.js` path.'
	);

	t.equal(
		require(join(result, '..\\..\\package.json')).version,
		process.env.another_npm_version,
		'should find the file under the customized `prefix` path.'
	);

	t.end();
});

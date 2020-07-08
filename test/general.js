const { describe, it } = require('mocha');
const { assert, expect } = require('chai');
const { Save } = require('../dist/src/index');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const s = new Save('http://localhost:3001', {
	username: 'saveuser',
	password: 'savepass',
});
const test_url = 'https://github.com/securisec/chepy';

const resolvePath = (index) => {
	return resolve(__dirname, `../../save-server/server/data/${index}.json`);
};

describe('Import data', () => {
	it('tools', () =>
		s
			.toolsImport(JSON.parse(readFileSync(resolvePath('tools'), 'utf-8')))
			.then((d) => {
				expect(d).to.equal('Tools updated successfully');
			}));

	it('blogs', () =>
		s
			.blogsImport(JSON.parse(readFileSync(resolvePath('blogs'), 'utf-8')))
			.then((d) => {
				expect(d).to.equal('Blogs updated successfully');
			}));
});

describe('General tests', () => {
	it('api', () =>
		s.api().then((d) => {
			expect(d.tools).to.be.greaterThan(0);
			expect(d.blogs).to.be.greaterThan(0);
			assert.equal(typeof d.version, 'string');
		}));

	it('version', () =>
		s.version().then((d) => {
			expect(d.author).to.be.equal('Hapsida');
			expect(d.twitter).to.equal('@securisec');
			expect(d.name).to.equal('Save!');
		}));

	it('backup', () =>
		s.backup().then((d) => {
			expect(d.length).to.equal(2);
		}));

	it('logs', () =>
		s.logs().catch((err) => {
			expect(err.status).equal(404);
		}));

	it('searchAny', () =>
		s.searchAny({ query: 'save' }).then((d) => {
			assert.equal(d.count, 20);
			assert.notEqual(d.data.tools[0].name, '');
			assert.notEqual(d.data.blogs[0].resolved_title, '');
		}));

	it('searchExactAnyIndex', () =>
		s.searchExactAnyIndex({ url: test_url }).then((d) => {
			expect(d.index).equal('tools');
			expect(d.data.name).equal('chepy');
			expect(d.data.categories.length).greaterThan(0);
		}));
});

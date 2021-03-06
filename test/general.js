const { describe, it } = require('mocha');
const { assert, expect } = require('chai');
const { Save } = require('../dist/src/index');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const host = 'http://localhost:3001';
let apikey = process.env.TESTKEY;
if (!apikey) {
	process.exit(2);
}
const s = new Save(host, apikey);
const test_url = 'https://github.com/securisec/chepy';

const resolvePath = (index) => {
	return resolve(__dirname, `../../save-server/server/data/backup/${index}.json`);
};

describe('Import data', () => {
	it('tools', () =>
		s
			.toolsImport(JSON.parse(readFileSync(resolvePath('tools'), 'utf-8')))
			.then((d) => {
				expect(d.message).to.equal('Tools updated successfully');
			}));

	it('blogs', () =>
		s
			.blogsImport(JSON.parse(readFileSync(resolvePath('blogs'), 'utf-8')))
			.then((d) => {
				expect(d.message).to.equal('Blogs updated successfully');
			}));
});

describe('General tests', () => {
	it('api', () =>
		s.api().then((d) => {
			expect(d.data.author).to.be.equal('Hapsida');
			expect(d.data.twitter).to.equal('@securisec');
			// expect(d.data.tools).to.be.greaterThan(0);
			// expect(d.data.blogs).to.be.greaterThan(0);
			assert.equal(typeof d.data.version, 'string');
		}));

	it('info', () =>
		s.info().then((d) => {
			expect(d.data.author).to.be.equal('Hapsida');
			expect(d.data.twitter).to.equal('@securisec');
			expect(d.data.count['tools']).to.be.greaterThan(0);
			expect(d.data.count['blogs']).to.be.greaterThan(0);
			expect(d.data.name).to.equal('Save!');
		}));

	it('backup', () =>
		s.backup().then((d) => {
			expect(d.status).to.equal(200);
		}));

	// it('logs', () =>
	// 	s.logs().then((err) => {
	// 		expect(err.response.status).equal(404);
	// 	}));

	it('searchAny', () =>
		s.searchAny('save').then((d) => {
			assert.notEqual(d.count, 0);
			assert.notEqual(d.data[0].excerpt, '');
			assert.notEqual(d.data[0].title, '');
		}));

	it('searchExactAnyIndex', () =>
		s.searchExactAnyIndex(test_url).then((d) => {
			expect(d.data.index).equal('tools');
			expect(d.data.title).equal('chepy');
			expect(d.data.keywords.length).greaterThan(0);
		}));
});

const { describe, it } = require('mocha');
const { assert, expect } = require('chai');
const { Save } = require('../dist/src/index');

const host = 'http://localhost:3001';
let apikey = process.env.TESTKEY;
if (!apikey) {
	process.exit(2);
}
const s = new Save(host, apikey);
const test_url = 'https://github.com/securisec/chepy';

describe('Tools API', () => {
	it('toolsAll', () =>
		s.toolsAll().then((res) => {
			expect(res.count).greaterThan(1);
		}));

	it('toolsSearchCategories', () =>
		s
			.toolsSearchCategories({
				filter: ['vue'],
				fields: true,
			})
			.then((res) => {
				expect(res.count).greaterThan(0);
				expect(res.fields.length).greaterThan(1);
				expect(res.data[0].name).not.equal('');
			}));

	it('toolsCategoriesByCount', () =>
		s.toolsCategoriesByCount({ q: 'python' }).then((res) => {
			expect(res.data).greaterThan(1);
		}));

	it('toolsExact', () =>
		s.toolsExact({ url: test_url }).then((res) => {
			assert.strictEqual(res.data.name, 'chepy');
		}));

	it('toolsRandom', () =>
		s.toolsRandom().then((res) => {
			expect(res.status).equal(200);
			expect(res.data.name).not.equal('');
		}));

	it('toolsExport', () =>
		s.toolsExport().then((res) => {
			expect(res.time_saved).greaterThan(Date.now());
			expect(res.count).greaterThan(1);
			expect(res.data[0].name).not.equal('');
		}));

	it('toolsLatest', () =>
		s.toolsLatest({ limit: 1 }).then((res) => {
			assert.equal(res.count, 1);
			expect(res.data[0].name).not.equal('');
		}));

	it('toolsSearch', () =>
		s.toolsSearch({ query: 'chepy', limit: 1 }).then((res) => {
			assert.equal(res.count, 1);
			assert.equal(res.data[0].name, 'chepy');
		}));

	it('toolsDelete', () =>
		s
			.toolsDelete({ id: '5dc64e956760116e061b90d2a1de62e91b8e3f9e' })
			.then((res) => {
				expect(res).not.equal('');
			}));

	it('toolsAddUpdate', () =>
		s
			.toolsAddUpdate({
				name: 'chepy',
				url: 'https://github.com/securisec/chepy',
				categories: ['chepy', 'python'],
			})
			.then((res) => {
				expect(res).not.equal('');
			}));
});

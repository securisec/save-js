const { describe, it } = require('mocha');
const { assert, expect } = require('chai');
const { Save } = require('../dist/src/index');

const host = 'http://localhost:3001';
let apikey = process.env.TESTKEY
if (!apikey) {
	process.exit(2)
}
const s = new Save(host, apikey);

describe('Blogs API', () => {
	
	it('blogsAll', () =>
		s.blogsAll().then((res) => {
			expect(res.count).greaterThan(1);
			expect(res.data[0].keywords.length).greaterThan(0);
		}));

	it('blogsCategories', () =>
		s.blogsSearchCategories({ fields: true, filter: ['vue'] }).then((res) => {
			expect(res.count).greaterThan(0);
		}));

	it('blogsExact', () =>
		s
			.blogsExact({
				url: 'https://gist.github.com/s0md3v/78ca77b8bfc16649eaa81762039d62c7',
			})
			.then((res) => {
				expect(res.data.title).include('concurrency');
			}));

	it('blogsExport', () =>
		s.blogsExport().then((res) => {
			expect(res.time_saved).greaterThan(Date.now());
			expect(res.count).greaterThan(1);
			expect(res.data[0].url).includes('http');
		}));

	it('blogsKeywordsByCount', () =>
		s.blogsKeywordsByCount({ q: 'vue' }).then((res) => {
			expect(res.data).greaterThan(1);
		}));

	it('blogsLatest', () =>
		s.blogsLatest().then((res) => {
			assert.equal(res.count, 10);
		}));

	it('blogsSearch', () =>
		s.blogsSearch({ query: 's0med3v' }).then((res) => {
			let data = res.data[0];
			expect(data.excerpt).includes('concurrency');
			assert.equal(
				data.url,
				'https://gist.github.com/s0md3v/78ca77b8bfc16649eaa81762039d62c7'
			);
			assert.equal(res.count, 1);
		}));

	it('blogsDelete', () =>
		s
			.blogsDelete({ id: 'b096d894ea0ae9b148e5d7439d42960ff7b8cb5a' })
			.then((res) => {
				expect(res).not.equal('');
			}));

	it('blogsAddUpdate', () =>
		s
			.blogsAddUpdate({
				url:
					'https://gist.github.com/s0md3v/78ca77b8bfc16649eaa81762039d62c7',
				keywords: ['go', 'con'],
				excerpt: 'some data',
				title: 'go concurrency',
			})
			.then((res) => {
				expect(res).not.equal('');
			}));
});

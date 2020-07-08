import Axios, { AxiosError } from 'axios';
import { version } from '../package.json';
import {
	Api,
	ApiVersion,
	ApiExact,
	LogJson,
	Categories,
	SearchAllResponse,
} from './types/general';
import {
	BlogSearchResponse,
	Blog,
	BlogSearchCategoriesResponse,
	BlogAdd,
	BlogsUpdateBody,
	BlogExportRes,
} from './types/blogs';
import {
	Tool,
	ToolSearchCategoriesResponse,
	ToolSearchResponse,
	ToolsUpdateBody,
	ToolAdd,
	ToolExportRes,
} from './types/tools';

export class Save {
	private serverUrl: string;
	private auth: { username: string; password: string };

	constructor(serverUrl: string, auth?: { username: ''; password: '' }) {
		this.serverUrl = serverUrl;
		this.auth = auth || { username: '', password: '' };
	}

	private makeRequest(
		endpoint: string,
		method: any,
		data?: object,
		query?: object
	): Promise<any> {
		return new Promise((resolve, reject) => {
			Axios({
				method: method,
				baseURL: this.serverUrl,
				url: endpoint,
				data: data,
				auth: this.auth,
				params: query,
				headers: { 'User-Agent': `save-js-${version}` },
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err: AxiosError) => {
					reject({
						status: err.response?.status,
						body: err.response?.data,
					});
				});
		});
	}

	/**
	 *General information about the server like version, count etc
	 *
	 * @returns {Promise<Api>}
	 */
	api = (): Promise<Api> => {
		return this.makeRequest('/api/v1', 'get');
	};

	/**
		 *Endpoint that acts as a health check, and does not rely on any
		 backend connections.
		 **requires auth**
		 *
		 * @returns {Promise<ApiVersion>}
		 */
	version = (): Promise<ApiVersion> => {
		return this.makeRequest('/api/v1/version', 'get');
	};

	/**
	 *Find an exact match on any index
	 *
	 * @param {{ url: string }} data The url to search for
	 * @returns {Promise<ApiExact>}
	 */
	searchExactAnyIndex = (data: { url: string }): Promise<ApiExact> => {
		return this.makeRequest('/api/v1/exact', 'post', data);
	};

	/**
	 *Endpoint that will trigger a backup operation for Save! server
	 **requires auth**
	 *
	 * @returns {Promise<Array<string>>}
	 */
	backup = (): Promise<Array<string>> => {
		return this.makeRequest('/api/v1/backup', 'get');
	};

	/**
	 *Get request logs from the server. Supports text or json format.
	 **requires auth**
	 *
	 * @param {{format: 'json'}} query Request logs as JSON
	 * @returns {Promise<Array<LogJson>>} If JSON requested, array of Log objects
	 */
	logs = (query: { format: 'json' }): Promise<Array<LogJson>> => {
		return this.makeRequest('/api/v1/logs', 'get', {}, query);
	};

	/**
	 *Search for blogs
	 *
	 * @param {({
	 * 			query: string;
	 * 			limit?: number;
	 * 			fields?: ['excerpt' | 'resolved_title' | 'resolved_url' | 'keywords'];
	 * 		})} data
	 * @returns {Promise<BlogSearchResponse>}
	 */
	blogsSearch = (data: {
		query: string;
		limit?: number;
		fields?: ['excerpt' | 'resolved_title' | 'resolved_url' | 'keywords'];
	}): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/blogs', 'post', data);
	};

	/**
	 *Search for an exact blog
	 *
	 * @param {{ url: string }} data URL to search for
	 * @returns {Promise<Blog>}
	 */
	blogsExact = (data: { url: string }): Promise<Blog> => {
		return this.makeRequest('/api/v1/blogs/exact', 'post', data);
	};

	/**
	 *Search blogs by categories
	 *
	 * @param {{
	 * 			fields: boolean;
	 * 			limit: number;
	 * 			filter: Array<string>;
	 * 		}} data
	 * @returns {Promise<BlogSearchCategoriesResponse>}
	 */
	blogsSearchCategories = (data: {
		fields?: boolean;
		limit?: number;
		filter: Array<string>;
	}): Promise<BlogSearchCategoriesResponse> => {
		return this.makeRequest('/api/v1/blogs/categories', 'post', data);
	};

	/**
	 *Search for an exact tool
	 *
	 * @param {{ url: string }} data
	 * @returns {Promise<Tool>}
	 */
	toolsExact = (data: { url: string }): Promise<Tool> => {
		return this.makeRequest('/api/v1/tools/exact', 'post', data);
	};

	/**
	 *Search tools by categories
	 *
	 * @param {{
	 * 			fields: boolean;
	 * 			limit: number;
	 * 			filter: Array<string>;
	 * 		}} data
	 * @returns {Promise<ToolSearchCategoriesResponse>}
	 */
	toolsSearchCategories = (data: {
		fields?: boolean;
		limit?: number;
		filter: Array<string>;
	}): Promise<ToolSearchCategoriesResponse> => {
		return this.makeRequest('/api/v1/tools/categories', 'post', data);
	};

	/**
	 *Search tools
	 *
	 * @param {({
	 * 			query: string;
	 * 			limit?: number;
	 * 			fields?: ['name' | 'description' | 'categories' | 'similar'];
	 * 		})} data
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsSearch = (data: {
		query: string;
		limit?: number;
		fields?: ['name' | 'description' | 'categories' | 'similar'];
	}): Promise<ToolSearchResponse> => {
		return this.makeRequest('/api/v1/tools', 'post', data);
	};

	/**
		 *Search both tools and blogs indexes. Not as customizable as 
		 individual index searches
		 *
		 * @param {{query: string}} data What to search for
		 * @returns {Promise<SearchAllResponse>}
		 */
	searchAny = (data: { query: string }): Promise<SearchAllResponse> => {
		return this.makeRequest('/api/v1/search', 'post', data);
	};

	/**
	 *Get all the tools
	 *
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsAll = (): Promise<ToolSearchResponse | number> => {
		return this.makeRequest('/api/v1/tools/all', 'get');
	};

	/**
	 *Get all the categories and their counts
	 *
	 * @param {{
	 * 			q?: string;
	 * 		}} query
	 * @returns {(Promise<Categories | number>)}
	 */
	toolsCategoriesByCount = (query: {
		q?: string;
	}): Promise<Categories | number> => {
		return this.makeRequest('/api/v1/tools/categories', 'get', {}, query);
	};

	/**
	 *Import tools into the backend. ***This does not update an individual tool***
	 *
	 * @param {ToolsUpdateBody} data
	 * @returns {Promise<string>}
	 */
	toolsImport = (data: ToolsUpdateBody): Promise<string> => {
		return this.makeRequest('/api/v1/tools/import', 'put', data);
	};

	/**
	 *Export all tools as an importable dataset
	 *
	 * @returns {Promise<ToolExportRes>}
	 */
	toolsExport = (): Promise<ToolExportRes> => {
		return this.makeRequest('/api/v1/tools/export', 'get', {}, {});
	};

	/**
	 *Get latest tools
	 *
	 * @param {{ limit: number }} [query] Request latest x number of tools
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsLatest = (query?: { limit: number }): Promise<ToolSearchResponse> => {
		return this.makeRequest('/api/v1/tools', 'get', {}, query);
	};

	/**
	 *Delete a tool by id
	 *
	 * @param {{ id: string }} data Id to tool to be deleted
	 * @returns {Promise<string>}
	 */
	toolsDelete = (data: { id: string }): Promise<string> => {
		return this.makeRequest('/api/v1/tools', 'delete', data);
	};

	/**
	 *Add a new tool. This function can also be used to update an existing tool
	 *
	 * @param {ToolAdd} data
	 * @returns {Promise<string>}
	 */
	toolsAddUpdate = (data: ToolAdd): Promise<string> => {
		return this.makeRequest('/api/v1/tools', 'put', data);
	};

	blogsLatest = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/blogs', 'get');
	};

	/**
	 *Delete a blog
	 *
	 * @param {{ id: string }} data ID of blog to delete
	 * @returns {Promise<string>}
	 */
	blogsDelete = (data: { id: string }): Promise<string> => {
		return this.makeRequest('/api/v1/blogs', 'delete', data);
	};

	/**
	 *Add a blog
	 *
	 * @param {BlogAdd} data
	 * @returns {Promise<string>}
	 */
	blogsAddUpdate = (data: BlogAdd): Promise<string> => {
		return this.makeRequest('/api/v1/blogs', 'put', data);
	};

	/**
	 *Export blogs dataset
	 *
	 * @returns {Promise<BlogExportRes>}
	 */
	blogsExport = (): Promise<BlogExportRes> => {
		return this.makeRequest('/api/v1/blogs/export', 'get');
	};

	/**
	 *Get all blogs
	 *
	 * @returns {Promise<BlogSearchResponse>}
	 */
	blogsAll = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/blogs/all', 'get');
	};

	/**
	 *Get all keywords and their counts for blogs
	 *
	 * @param {{
	 * 			q: string;
	 * 		}} query
	 * @returns {(Promise<BlogSearchResponse | number>)}
	 */
	blogsKeywordsByCount = (query: {
		q?: string;
	}): Promise<BlogSearchResponse | number> => {
		return this.makeRequest('/api/v1/blogs/categories', 'get', {}, query);
	};

	/**
	 *Import blog dataset
	 *
	 * @param {BlogsUpdateBody} data
	 * @returns {Promise<string>}
	 */
	blogsImport = (data: BlogsUpdateBody): Promise<string> => {
		return this.makeRequest('/api/v1/blogs/import', 'put', data);
	};
}

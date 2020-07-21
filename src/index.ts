import Axios, { AxiosError } from 'axios';
import { version } from '../package.json';
import {
	Api,
	ApiExact,
	LogJson,
	Categories,
	SearchAllResponse,
	ResponseConstant,
	ApiInfo,
} from './types/general';
import {
	BlogSearchResponse,
	BlogSearchCategoriesResponse,
	BlogAdd,
	BlogsUpdateBody,
	BlogExportRes,
	BlogExactResponse,
} from './types/blogs';
import {
	ToolSearchCategoriesResponse,
	ToolSearchResponse,
	ToolsUpdateBody,
	ToolAdd,
	ToolExportRes,
	ToolExactResponse,
} from './types/tools';
import { AuthResponse, AuthAllUsers, AuthCreateUserResp } from './types/auth';

export class Save {
	private host: string;
	private apikey: string | null;
	public userAgent: string;

	constructor(host: string, apikey: string | null) {
		this.host = host;
		this.apikey = apikey;
		this.userAgent = `save-js-${version}`;
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
				baseURL: this.host,
				url: endpoint,
				data: data,
				params: query,
				headers: {
					'User-Agent': this.userAgent,
					'x-save-apikey': this.apikey,
				},
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
		 * @returns {Promise<ApiInfo>}
		 */
	info = (): Promise<ApiInfo> => {
		return this.makeRequest('/api/v1/info', 'get');
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
	 * @returns {Promise<ResponseConstant>}
	 */
	backup = (): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/backup', 'get');
	};

	/**
	 *Get request logs from the server. Supports text or json format.
	 **requires auth**
	 *
	 * @param {{format: 'json'}} query Request logs as JSON
	 * @returns {Promise<LogJson>} If JSON requested, array of Log objects
	 */
	logs = (query: { format: 'json' }): Promise<LogJson> => {
		return this.makeRequest('/api/v1/logs', 'get', {}, query);
	};

	/**
	 *Search for blogs
	 *
	 * @param {({
	 * 			query: string;
	 * 			limit?: number;
	 * 			fields?: ['excerpt' | 'title' | 'url' | 'keywords'];
	 * 		})} data
	 * @returns {Promise<BlogSearchResponse>}
	 */
	blogsSearch = (data: {
		query: string;
		limit?: number;
		fields?: ['excerpt' | 'title' | 'url' | 'keywords'];
	}): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/blogs', 'post', data);
	};

	/**
	 *Search for an exact blog
	 *
	 * @param {{ url: string }} data URL to search for
	 * @returns {Promise<BlogExactResponse>}
	 */
	blogsExact = (data: { url: string }): Promise<BlogExactResponse> => {
		return this.makeRequest('/api/v1/blogs/exact', 'post', data);
	};

	/**
	 *Get a random blog
	 *
	 * @returns {Promise<BlogExactResponse>}
	 */
	blogsRandom = (): Promise<BlogExactResponse> => {
		return this.makeRequest('/api/v1/blogs/random', 'get');
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
	 * @returns {Promise<ToolExactResponse>}
	 */
	toolsExact = (data: { url: string }): Promise<ToolExactResponse> => {
		return this.makeRequest('/api/v1/tools/exact', 'post', data);
	};

	/**
	 *Get a random tool
	 *
	 * @returns {Promise<ToolExactResponse>}
	 */
	toolsRandom = (): Promise<ToolExactResponse> => {
		return this.makeRequest('/api/v1/tools/random', 'get');
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
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsImport = (data: ToolsUpdateBody): Promise<ResponseConstant> => {
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
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsDelete = (data: { id: string }): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/tools', 'delete', data);
	};

	/**
	 *Add a new tool. This function can also be used to update an existing tool
	 *
	 * @param {ToolAdd} data
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsAddUpdate = (data: ToolAdd): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/tools', 'put', data);
	};

	blogsLatest = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/blogs', 'get');
	};

	/**
	 *Delete a blog
	 *
	 * @param {{ id: string }} data ID of blog to delete
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsDelete = (data: { id: string }): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/blogs', 'delete', data);
	};

	/**
	 *Add a blog
	 *
	 * @param {BlogAdd} data
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsAddUpdate = (data: BlogAdd): Promise<ResponseConstant> => {
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
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsImport = (data: BlogsUpdateBody): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/blogs/import', 'put', data);
	};

	/**
	 *Get API key information from authentication
	 *
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<AuthResponse>}
	 */
	authGetAPIKey = (
		username: string,
		password: string
	): Promise<AuthResponse> => {
		return this.makeRequest('/api/v1/auth', 'post', {
			username: username,
			password: password,
		});
	};

	/**
	 *Get all the users
	 *
	 * @returns {Promise<AuthAllUsers>}
	 */
	authGetAllUsers = (): Promise<AuthAllUsers> => {
		return this.makeRequest('/api/v1/auth/user', 'get');
	};

	/**
	 *Create a new user
	 *
	 * @param {{
	 * 		username: string;
	 * 		admin: boolean;
	 * 	}} user
	 * @returns {Promise<AuthCreateUserResp>}
	 */
	authCreateUser = (user: {
		username: string;
		admin: boolean;
	}): Promise<AuthCreateUserResp> => {
		return this.makeRequest('/api/v1/auth/user', 'post', user);
	};

	/**
	 *Delete a user
	 *
	 * @param {string} username
	 * @returns {Promise<ResponseConstant>}
	 */
	authDeleteUser = (username: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/auth/user', 'delete', {
			username: username,
		});
	};

	/**
	 *Change password
	 *
	 * @param {string} newPassword
	 * @returns {Promise<ResponseConstant>}
	 */
	authChangePassword = (newPassword: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/auth/user/password', 'post', {
			password: newPassword,
		});
	};

	/**
	 *Reset API Key
	 *
	 * @returns {Promise<{ apikey: string }>}
	 */
	authResetAPIKey = (): Promise<{ apikey: string }> => {
		return this.makeRequest('/api/v1/auth/user/apikey', 'post');
	};
}

import Axios, { AxiosError } from 'axios';
import {
	Api,
	ApiVersion,
	ApiExact,
	LogJson,
	Categories,
} from './types/general';
import {
	BlogSearchResponse,
	Blog,
	BlogSearchCategoriesResponse,
	BlogAdd,
	BlogsUpdateBody,
} from './types/blogs';
import {
	Tool,
	ToolSearchCategoriesResponse,
	ToolSearchResponse,
	ToolsUpdateBody,
	ToolAdd,
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
	 *General Api route endpoints
	 *
	 * @memberof Save
	 */
	public general = {
		/**
		 *General information about the server like version, count etc
		 *
		 * @returns {Promise<Api>}
		 */
		api: (): Promise<Api> => {
			return this.makeRequest('/api', 'get');
		},

		/**
		 *Endpoint that acts as a health check, and does not rely on any
		 backend connections.
		 **requires auth**
		 *
		 * @returns {Promise<ApiVersion>}
		 */
		version: (): Promise<ApiVersion> => {
			return this.makeRequest('/api/version', 'get');
		},

		/**
		 *Find an exact match on any index
		 *
		 * @param {{ url: string }} data The url to search for
		 * @returns {Promise<ApiExact>}
		 */
		exact: (data: { url: string }): Promise<ApiExact> => {
			return this.makeRequest('/api/exact', 'post', data);
		},

		/**
		 *Endpoint that will trigger a backup operation for Save! server
		 **requires auth**
		 *
		 * @returns {Promise<Array<string>>}
		 */
		backup: (): Promise<Array<string>> => {
			return this.makeRequest('/api/backup', 'get');
		},

		/**
		 *Get request logs from the server. Supports text or json format.
		 **requires auth**
		 *
		 * @param {{format: 'json'}} query Request logs as JSON
		 * @returns {Promise<Array<LogJson>>} If JSON requested, array of Log objects
		 */
		logs: (query: { format: 'json' }): Promise<Array<LogJson>> => {
			return this.makeRequest('/api/logs', 'get', {}, query);
		},
	};

	/**
	 *Api endpoints related to search
	 *
	 * @memberof Save
	 */
	public search = {
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
		blogs: (data: {
			query: string;
			limit?: number;
			fields?: ['excerpt' | 'resolved_title' | 'resolved_url' | 'keywords'];
		}): Promise<BlogSearchResponse> => {
			return this.makeRequest('/api/blogs', 'post', data);
		},

		/**
		 *Search for an exact blog
		 *
		 * @param {{ url: string }} data URL to search for
		 * @returns {Promise<Blog>}
		 */
		blogsExact: (data: { url: string }): Promise<Blog> => {
			return this.makeRequest('/api/blogs/exact', 'post', data);
		},

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
		blogsCategories: (data: {
			fields: boolean;
			limit: number;
			filter: Array<string>;
		}): Promise<BlogSearchCategoriesResponse> => {
			return this.makeRequest('/api/blogs/categories', 'post', data);
		},

		/**
		 *Search for an exact tool
		 *
		 * @param {{ url: string }} data
		 * @returns {Promise<Tool>}
		 */
		toolsExact: (data: { url: string }): Promise<Tool> => {
			return this.makeRequest('/api/tools/exact', 'post', data);
		},

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
		toolsCategories: (data: {
			fields: boolean;
			limit: number;
			filter: Array<string>;
		}): Promise<ToolSearchCategoriesResponse> => {
			return this.makeRequest('/api/tools/categories', 'post', data);
		},

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
		tools: (data: {
			query: string;
			limit?: number;
			fields?: ['name' | 'description' | 'categories' | 'similar'];
		}): Promise<ToolSearchResponse> => {
			return this.makeRequest('/api/tools', 'post', data);
		},
	};

	/**
	 *Api endpoints related to tools
	 *
	 * @memberof Save
	 */
	public tool = {
		/**
		 * Mapped to search.toolsExact
		 */
		exact: this.search.toolsExact,

		/**
		 *Get all the tools
		 *
		 * @returns {Promise<ToolSearchResponse>}
		 */
		all: (): Promise<ToolSearchResponse | number> => {
			return this.makeRequest('/api/tools/all', 'get');
		},

		/**
		 *Get all the categories and their counts
		 *
		 * @param {{
		 * 			q?: string;
		 * 		}} query
		 * @returns {(Promise<Categories | number>)}
		 */
		categoriesByCount: (query: {
			q?: string;
		}): Promise<Categories | number> => {
			return this.makeRequest('/api/tools/categories', 'get', {}, query);
		},

		/**
		 * Mapped to search.toolsCategories
		 */
		categories: this.search.toolsCategories,

		/**
		 *Update the tools db index. ***This does not update an individual tool***
		 *
		 * @param {ToolsUpdateBody} data
		 * @returns {Promise<string>}
		 */
		updateToolsIndex: (data: ToolsUpdateBody): Promise<string> => {
			return this.makeRequest('/api/tools/update', 'put', data);
		},

		/**
		 *Get latest tools
		 *
		 * @param {{ limit: number }} [query] Request latest x number of tools
		 * @returns {Promise<ToolSearchResponse>}
		 */
		latest: (query?: { limit: number }): Promise<ToolSearchResponse> => {
			return this.makeRequest('/api/tools', 'get', {}, query);
		},

		/**
		 * Mapped to search.tools
		 */
		search: this.search.tools,

		/**
		 *Delete a tool by id
		 *
		 * @param {{ id: string }} data Id to tool to be deleted
		 * @returns {Promise<string>}
		 */
		delete: (data: { id: string }): Promise<string> => {
			return this.makeRequest('/api/tools', 'delete', data);
		},

		/**
		 *Add a new tool. This function can also be used to update an existing tool
		 *
		 * @param {ToolAdd} data
		 * @returns {Promise<string>}
		 */
		addTool: (data: ToolAdd): Promise<string> => {
			return this.makeRequest('/api/tool', 'put', data);
		},

		/**
		 *Update a new tool. This function can also be used to add a tool if it does not exist
		 *
		 * @param {ToolAdd} data
		 * @returns {Promise<string>}
		 */
		updateTool: (data: ToolAdd): Promise<string> => {
			return this.makeRequest('/api/tool', 'put', data);
		},
	};

	public blogs = {
		latest: (): Promise<BlogSearchResponse> => {
			return this.makeRequest('/api/blogs', 'get');
		},

		searchBlogs: this.search.blogs,

		deleteBlog: (data: { id: string }): Promise<string> => {
			return this.makeRequest('/api/blog', 'delete', data);
		},

		addBlog: (data: BlogAdd): Promise<string> => {
			return this.makeRequest('/api/blog', 'put', data);
		},

		updateBlog: (data: BlogAdd): Promise<string> => {
			return this.makeRequest('/api/blog', 'put', data);
		},

		exact: this.search.blogsExact,

		all: (): Promise<BlogSearchResponse> => {
			return this.makeRequest('/api/blogs/all', 'get');
		},

		keywordsByCount: (query: {
			q: string;
		}): Promise<BlogSearchResponse | number> => {
			return this.makeRequest('/api/blogs/categories', 'get', query);
		},

		categories: this.search.blogsCategories,

		updateBlogsIndex: (data: BlogsUpdateBody): Promise<string> => {
			return this.makeRequest('/api/blogs/update', 'put', data);
		},
	};
}

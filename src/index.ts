import Axios, { AxiosError } from 'axios';
import { version } from '../package.json';
import {
	Api,
	ApiExact,
	LogJson,
	CategoriesResponse,
	SearchAllResponse,
	ResponseConstant,
	ApiInfo,
	AllIndexesResponse,
	OtherResponse,
	CategoriesSearch,
	CategoriesSearchResponse,
	OthersImportBody,
	OtherExportRes,
	OtherExactRes,
	MiscContentResponse,
} from './types/general';
import {
	BlogSearchResponse,
	BlogSearchCategoriesResponse,
	BlogAdd,
	BlogsUpdateBody,
	BlogExportRes,
	BlogExactResponse,
	Entry,
} from './types/blogs';
import {
	ToolSearchCategoriesResponse,
	ToolSearchResponse,
	ToolsImportBody,
	ToolAdd,
	ToolExportRes,
	ToolExactResponse,
} from './types/tools';
import { AuthResponse, AuthAllUsers, AuthCreateUserResp } from './types/auth';
import {
	ImageExactResponse,
	ImageExportRes,
	ImageImportBody,
	ImageSearchCategoriesResponse,
	ImageSearchResponse,
	ImageUpdateBody,
} from './types/images';

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
		method: 'get' | 'post' | 'delete' | 'put',
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
	 * @param {string } url The url to search for
	 * @returns {Promise<ApiExact>}
	 */
	searchExactAnyIndex = (url: string): Promise<ApiExact> => {
		return this.makeRequest('/api/v1/exact', 'post', { url: url });
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
		return this.makeRequest('/api/v1/index/blogs', 'post', data);
	};

	/**
	 *Search for an exact blog
	 *
	 * @param {string} url URL to search for
	 * @returns {Promise<BlogExactResponse>}
	 */
	blogsExact = (url: string): Promise<BlogExactResponse> => {
		return this.makeRequest('/api/v1/index/blogs/exact', 'post', { url: url });
	};

	/**
	 *Get a random blog
	 *
	 * @returns {Promise<BlogExactResponse>}
	 */
	blogsRandom = (): Promise<BlogExactResponse> => {
		return this.makeRequest('/api/v1/index/blogs/random', 'get');
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
	blogsSearchCategories = (
		data: CategoriesSearch
	): Promise<BlogSearchCategoriesResponse> => {
		return this.makeRequest('/api/v1/index/blogs/categories', 'post', data);
	};

	/**
	 *Search for an exact tool
	 *
	 * @param {string} url
	 * @returns {Promise<ToolExactResponse>}
	 */
	toolsExact = (url: string): Promise<ToolExactResponse> => {
		return this.makeRequest('/api/v1/index/tools/exact', 'post', { url: url });
	};

	/**
	 *Get a random tool
	 *
	 * @returns {Promise<ToolExactResponse>}
	 */
	toolsRandom = (): Promise<ToolExactResponse> => {
		return this.makeRequest('/api/v1/index/tools/random', 'get');
	};

	/**
	 *Get a random image
	 *
	 * @returns {Promise<ImageExactResponse>}
	 */
	imagesRandom = (): Promise<ImageExactResponse> => {
		return this.makeRequest('/api/v1/index/images/random', 'get');
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
	toolsSearchCategories = (
		data: CategoriesSearch
	): Promise<ToolSearchCategoriesResponse> => {
		return this.makeRequest('/api/v1/index/tools/categories', 'post', data);
	};

	/**
	 *Search images by categories
	 *
	 * @param {{
	 * 			fields: boolean;
	 * 			limit: number;
	 * 			filter: Array<string>;
	 * 		}} data
	 * @returns {Promise<ImageSearchCategoriesResponse>}
	 */
	imagesSearchCategories = (
		data: CategoriesSearch
	): Promise<ImageSearchCategoriesResponse> => {
		return this.makeRequest('/api/v1/index/images/categories', 'post', data);
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
		return this.makeRequest('/api/v1/index/tools', 'post', data);
	};

	/**
	 *Search images
	 *
	 * @param {({
	 * 			query: string;
	 * 			limit?: number;
	 * 		})} data
	 * @returns {Promise<ImageSearchResponse>}
	 */
	imagesSearch = (data: {
		query: string;
		limit?: number;
	}): Promise<ImageSearchResponse> => {
		return this.makeRequest('/api/v1/index/images', 'post', data);
	};

	/**
		 *Search both tools and blogs indexes. Not as customizable as 
		 individual index searches
		 *
		 * @param {string} query What to search for
		 * @returns {Promise<SearchAllResponse>}
		 */
	searchAny = (query: string): Promise<SearchAllResponse> => {
		return this.makeRequest('/api/v1/search', 'post', { query: query });
	};

	/**
	 *Get all the tools
	 *
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsAll = (): Promise<ToolSearchResponse | number> => {
		return this.makeRequest('/api/v1/index/tools/all', 'get');
	};

	/**
	 *Get all the images
	 *
	 * @returns {Promise<ImageSearchResponse>}
	 */
	imagesAll = (): Promise<ImageSearchResponse | number> => {
		return this.makeRequest('/api/v1/index/images/all', 'get');
	};

	/**
	 *Get all the categories and their counts
	 *
	 * @param {{
	 * 			q?: string;
	 * 		}} query
	 * @returns {(Promise<CategoriesResponse | number>)}
	 */
	toolsCategoriesByCount = (query: {
		q?: string;
	}): Promise<CategoriesResponse | number> => {
		return this.makeRequest('/api/v1/index/tools/categories', 'get', {}, query);
	};

	/**
	 *Get all the categories and their counts
	 *
	 * @returns {(Promise<CategoriesResponse>)}
	 */
	imagesCategoriesByCount = (): Promise<CategoriesResponse | number> => {
		return this.makeRequest('/api/v1/index/images/categories', 'get');
	};

	/**
	 *Import tools into the backend. ***This does not update an individual tool***
	 *
	 * @param {ToolsImportBody} data
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsImport = (data: ToolsImportBody): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/tools/import', 'put', data);
	};

	/**
	 *Import images into the backend.
	 *
	 * @param {ImageImportBody} data
	 * @returns {Promise<ResponseConstant>}
	 */
	imagesImport = (data: ImageImportBody): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/import', 'put', data);
	};

	/**
	 *Export all tools as an importable dataset
	 *
	 * @returns {Promise<ToolExportRes>}
	 */
	toolsExport = (): Promise<ToolExportRes> => {
		return this.makeRequest('/api/v1/index/tools/export', 'get', {}, {});
	};

	/**
	 *Export all images as an importable dataset
	 *
	 * @returns {Promise<ImageExportRes>}
	 */
	imagesExport = (): Promise<ImageExportRes> => {
		return this.makeRequest('/api/v1/index/images/export', 'get', {}, {});
	};

	/**
	 *Get latest tools
	 *
	 * @param {{ limit: number }} [query] Request latest x number of tools
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsLatest = (query?: { limit: number }): Promise<ToolSearchResponse> => {
		return this.makeRequest('/api/v1/index/tools', 'get', {}, query);
	};

	/**
	 *Get latest images
	 *
	 * @param {{ limit: number }} [query] Request latest x number of images
	 * @returns {Promise<ImageSearchResponse>}
	 */
	imagesLatest = (query?: { limit: number }): Promise<ImageSearchResponse> => {
		return this.makeRequest('/api/v1/index/images', 'get', {}, query);
	};

	/**
	 *Delete a tool by id
	 *
	 * @param {{ id: string }} data Id to tool to be deleted
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsDelete = (data: { id: string }): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/tools', 'delete', data);
	};

	/**
	 *Add a new tool. This function can also be used to update an existing tool
	 *
	 * @param {ToolAdd} data
	 * @param {boolean} refresh Refresh the data in addition to updating
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsAddUpdate = (
		data: ToolAdd,
		refresh: boolean = false
	): Promise<ResponseConstant> => {
		let query = {};
		if (refresh) {
			query = { refresh: 'true' };
		}
		return this.makeRequest('/api/v1/index/tools', 'put', data, query);
	};

	blogsLatest = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/index/blogs', 'get');
	};

	/**
	 *Delete a blog
	 *
	 * @param {{ id: string }} data ID of blog to delete
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsDelete = (data: { id: string }): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/blogs', 'delete', data);
	};

	/**
	 *Add a blog
	 *
	 * @param {BlogAdd} data
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsAddUpdate = (data: BlogAdd): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/blogs', 'put', data);
	};

	/**
	 *Export blogs dataset
	 *
	 * @returns {Promise<BlogExportRes>}
	 */
	blogsExport = (): Promise<BlogExportRes> => {
		return this.makeRequest('/api/v1/index/blogs/export', 'get');
	};

	/**
	 *Get all blogs
	 *
	 * @returns {Promise<BlogSearchResponse>}
	 */
	blogsAll = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/index/blogs/all', 'get');
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
		return this.makeRequest('/api/v1/index/blogs/categories', 'get', {}, query);
	};

	/**
	 *Import blog dataset
	 *
	 * @param {BlogsUpdateBody} data
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsImport = (data: BlogsUpdateBody): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/blogs/import', 'put', data);
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
	authDeleteUser = (user_id: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/auth/user', 'delete', {
			user_id: user_id,
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

	/**
	 *Get all favorites
	 *
	 * @returns {Promise<ToolSearchResponse>}
	 */
	toolsGetFavorites = (): Promise<ToolSearchResponse> => {
		return this.makeRequest('/api/v1/index/tools/favorites', 'get');
	};

	/**
	 *Get all favorites
	 *
	 * @returns {Promise<ImageSearchResponse>}
	 */
	imagesGetFavorites = (): Promise<ImageSearchResponse> => {
		return this.makeRequest('/api/v1/index/images/favorites', 'get');
	};

	/**
	 *Add a favorite
	 *
	 * @param {string} url A valid URL
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsAddFavorite = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/tools/favorites', 'post', {
			url: url,
		});
	};

	/**
	 *Add a favorite
	 *
	 * @param {string} id A valid image id
	 * @returns {Promise<ResponseConstant>}
	 */
	imagesAddFavorite = (id: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/favorites', 'post', {
			id: id,
		});
	};

	/**
	 *Delete a favorite
	 *
	 * @param {string} url A valid URL
	 * @returns {Promise<ResponseConstant>}
	 */
	toolsDeleteFavorite = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/tools/favorites', 'delete', {
			url: url,
		});
	};

	/**
	 *Delete a favorite
	 *
	 * @param {string} id A valid image id
	 * @returns {Promise<ResponseConstant>}
	 */
	imagesDeleteFavorite = (id: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/favorites', 'delete', {
			id: id,
		});
	};

	/**
	 *Get all favorites
	 *
	 * @returns {Promise<ToolSearchResponse>}
	 */
	blogsGetFavorites = (): Promise<BlogSearchResponse> => {
		return this.makeRequest('/api/v1/index/blogs/favorites', 'get');
	};

	/**
	 *Add a favorite
	 *
	 * @param {string} url A valid URL
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsAddFavorite = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/blogs/favorites', 'post', {
			url: url,
		});
	};

	/**
	 *Delete a favorite
	 *
	 * @param {string} url A valid URL
	 * @returns {Promise<ResponseConstant>}
	 */
	blogsDeleteFavorite = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/blogs/favorites', 'delete', {
			url: url,
		});
	};

	/**
	 *Get all indexes
	 *
	 * @returns {Promise<AllIndexesResponse>}
	 */
	getAllIndexes = (): Promise<AllIndexesResponse> => {
		return this.makeRequest('/api/v1/index', 'get');
	};

	/**
	 *Add a new index
	 *
	 * @param {string} index Name of index
	 * @returns {Promise<ResponseConstant>}
	 */
	addIndex = (index: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index', 'post', { index: index });
	};

	/**
	 *Delete an index
	 *
	 * @param {string} index Name of index
	 * @returns {Promise<ResponseConstant>}
	 */
	deleteIndex = (index: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index', 'delete', { index: index });
	};

	/**
	 *Add an entry to specified index
	 *
	 * @param {string} index Name of index
	 * @param {Entry} entry Entry data
	 * @returns {Promise<ResponseConstant>}
	 */
	otherAddUpdate = (index: string, entry: Entry): Promise<ResponseConstant> => {
		let endpoint = `/api/v1/index/${index}`;
		return this.makeRequest(endpoint, 'put', entry);
	};

	/**
	 *Search specified index
	 *
	 * @param {string} index Index name
	 * @param {({
	 * 			query: string;
	 * 			limit?: number;
	 * 			fields?: ['entry_keywords' | 'title' | 'excerpt' | 'url'];
	 * 		})} query
	 * @returns {Promise<OtherResponse>}
	 */
	otherSearch = (
		index: string,
		query: {
			query: string;
			limit?: number;
			fields?: ['entry_keywords' | 'title' | 'excerpt' | 'url'];
		}
	): Promise<OtherResponse> => {
		let endpoint = `/api/v1/index/${index}`;
		return this.makeRequest(endpoint, 'post', query);
	};

	/**
	 *Get latest from specified index
	 *
	 * @param {string} index Index name
	 * @returns {Promise<OtherResponse>}
	 */
	otherLatest = (index: string): Promise<OtherResponse> => {
		let endpoint = `/api/v1/index/${index}`;
		return this.makeRequest(endpoint, 'get');
	};

	/**
	 *Delete an entry from specified index
	 *
	 * @param {string} index Index name
	 * @param {string} id Id to delete
	 * @returns {Promise<ResponseConstant>}
	 */
	otherDelete = (index: string, id: string): Promise<ResponseConstant> => {
		let endpoint = `/api/v1/index/${index}`;
		return this.makeRequest(endpoint, 'delete', { id: id });
	};

	/**
	 *Get all entries from specified index
	 *
	 * @param {string} index Index name
	 * @returns {Promise<OtherResponse>}
	 */
	otherAllEntries = (index: string): Promise<OtherResponse> => {
		let endpoint = `/api/v1/index/${index}/all`;
		return this.makeRequest(endpoint, 'get');
	};

	/**
	 *Get all keywords for specified index
	 *
	 * @param {string} index
	 * @returns {Promise<CategoriesResponse>}
	 */
	otherGetCategories = (index: string): Promise<CategoriesResponse> => {
		let endpoint = `/api/v1/index/${index}/categories`;
		return this.makeRequest(endpoint, 'get');
	};

	/**
	 *Search specified index by keywords
	 *
	 * @param {string} index Index name
	 * @param {CategoriesSearch} body
	 * @returns {Promise<CategoriesSearchResponse>}
	 */
	otherSearchCategories = (
		index: string,
		body: CategoriesSearch
	): Promise<CategoriesSearchResponse> => {
		let endpoint = `/api/v1/index/${index}/categories`;
		return this.makeRequest(endpoint, 'post', body);
	};

	/**
	 *Import data to specified index
	 *
	 * @param {string} index Index name
	 * @param {OthersImportBody} data
	 * @returns {Promise<ResponseConstant>}
	 */
	otherImport = (
		index: string,
		data: OthersImportBody
	): Promise<ResponseConstant> => {
		let endpoint = `/api/v1/index/${index}/import`;
		return this.makeRequest(endpoint, 'put', data);
	};

	/**
	 *Export all entries from specified index
	 *
	 * @param {string} index Index name
	 * @returns {Promise<OtherExportRes>}
	 */
	otherExport = (index: string): Promise<OtherExportRes> => {
		let endpoint = `/api/v1/index/${index}/export`;
		return this.makeRequest(endpoint, 'get');
	};

	/**
	 *Get all favorites from spcified index
	 *
	 * @param {string} index Index name
	 * @returns {Promise<OtherResponse>}
	 */
	otherGetFavorite = (index: string): Promise<OtherResponse> => {
		let endpoint = `/api/v1/index/${index}/favorites`;
		return this.makeRequest(endpoint, 'get');
	};

	/**
	 *Add a favorite to specified index
	 *
	 * @param {string} index Index name
	 * @param {string} url URL to add
	 * @returns {Promise<ResponseConstant>}
	 */
	otherAddFavorite = (
		index: string,
		url: string
	): Promise<ResponseConstant> => {
		let endpoint = `/api/v1/index/${index}/favorites`;
		return this.makeRequest(endpoint, 'post', { url: url });
	};

	/**
	 *Delete a favorite from specified index
	 *
	 * @param {string} index Index name
	 * @param {string} url URL to delete
	 * @returns {Promise<ResponseConstant>}
	 */
	otherDeleteFavorite = (
		index: string,
		url: string
	): Promise<ResponseConstant> => {
		let endpoint = `/api/v1/index/${index}/favorites`;
		return this.makeRequest(endpoint, 'delete', { url: url });
	};

	/**
	 *Check and get exact url from specified index
	 *
	 * @param {string} index Index name
	 * @param {string} url URL to add
	 * @returns {Promise<OtherExactRes>}
	 */
	otherExact = (index: string, url: string): Promise<OtherExactRes> => {
		let endpoint = `/api/v1/index/${index}/exact`;
		return this.makeRequest(endpoint, 'post', { url: url });
	};

	/**
	 *Upload an image from a URL
	 *
	 * @param {string} url a valid image url
	 * @returns {Promise<ResponseConstant>}
	 */
	imageUploadFromURL = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/upload/url', 'put', {
			url: url,
		});
	};

	imageUploadFromFile = (file_path: string) => {
		// TODO
		console.log('Not implemented', file_path);
		return;
	};

	/**
	 *Update info about an image
	 *
	 * @param {string} id a valid image id
	 * @param {ImageUpdateBody} body data to update
	 * @returns {Promise<ResponseConstant>}
	 */
	imageUpdate = (
		id: string,
		body: ImageUpdateBody
	): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/' + id, 'post', body);
	};

	/**
	 *Delete an image
	 *
	 * @param {string} id a valid image id
	 * @returns {Promise<ResponseConstant>}
	 */
	imageDelete = (id: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/' + id, 'delete');
	};

	/**
	 *Get an image
	 *
	 * @param {string} id a valid image id
	 * @returns {Promise<ResponseConstant>}
	 */
	imageGet = (id: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/index/images/' + id, 'get');
	};

	/**
	 *Basic HEAD based health check for a url
	 *
	 * @param {string} url URL to check
	 * @returns {Promise<ResponseConstant>}
	 */
	miscHealthCheck = (url: string): Promise<ResponseConstant> => {
		return this.makeRequest('/api/v1/misc/health', 'post', { url: url });
	};

	/**
	 *Get reader mode content for a URL
	 *
	 * @param {string} url a valid url
	 * @returns {Promise<MiscContentResponse>}
	 */
	miscGetContent = (url: string): Promise<MiscContentResponse> => {
		return this.makeRequest('/api/v1/misc/content', 'post', { url: url });
	};
}

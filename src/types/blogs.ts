import { ApiResponse, ResponseConstant } from './general';

export interface Entry {
	excerpt: string;
	image: string;
	id: string;
	url: string;
	title: string;
	created_on: number;
	keywords: Array<string>;
}

export interface BlogExactResponse extends ResponseConstant {
	data: Entry;
}

export interface BlogSearchFields {
	fields: 'keyword' | 'title' | 'excerpt' | 'url';
}

export interface BlogSearchResponse extends ApiResponse {
	data: Array<Entry>;
}

export interface BlogSearchCategoriesResponse extends BlogSearchResponse {
	fields: Array<string>;
}

export interface BlogAdd {
	keywords: Array<string>;
	excerpt?: string;
	url: string;
	title?: string;
}

export interface BlogsUpdateBody {
	data: Array<Entry>;
	count: number;
	time_saved: number;
}

export interface BlogExportRes {
	data: Array<Entry>;
	count: number;
	time_saved: number;
}

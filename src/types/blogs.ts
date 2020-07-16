import { ApiResponse, ResponseConstant } from './general';

export interface Blog {
	excerpt: string;
	image: string;
	id: string;
	objectID: string;
	resolved_title: string;
	resolved_url: string;
	url: string
	title: string
	keywords: Array<string>;
}

export interface BlogExactResponse extends ResponseConstant {
	data: Blog;
}

export interface BlogSearchFields {
	fields: 'excerpt' | 'title' | 'url' | 'keywords';
}

export interface BlogSearchResponse extends ApiResponse {
	data: Array<Blog>;
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
	data: Array<Blog>;
	count: number;
	time_saved: number;
}

export interface BlogExportRes {
	data: Array<Blog>;
	count: number;
	time_saved: number;
}

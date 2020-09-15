import { ApiResponse, ResponseConstant } from './general';

export interface Image {
	image: string;
	height: number;
	width: number;
	content_type: string;
	size: number;
	file_name: string;
	id: string;
	created_on: number;
	title: string;
	url: string;
	excerpt: string;
	keywords: Array<string>;
}

export interface ImageExactResponse extends ResponseConstant {
	data: Image;
}

export interface ImageSearchResponse extends ApiResponse {
	data: Array<Image>;
}

export interface ImageSearchCategoriesResponse extends ImageSearchResponse {
	count: number;
	fields: Array<string>;
}

export interface ImageImportBody {
	data: Array<Image>;
	count: number;
	time_saved: number;
}

export interface ImageExportRes {
	data: Array<Image>;
	count: number;
	time_saved: number;
}

export interface ImageUpdateBody {
	keywords?: Array<string>;
	title?: string;
	excerpt?: string;
}

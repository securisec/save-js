import { Entry } from './blogs';

export interface ResponseConstant {
	status: number;
	message: any;
}

export interface Api extends ResponseConstant {
	data: {
		name: string;
		version: string;
		author: string;
		twitter: string;
	};
}

export interface ApiInfo extends ResponseConstant {
	data: {
		name: string;
		version: string;
		author: string;
		twitter: string;
		request_logging: boolean;
		count: {
			[key: string]: number;
		};
	};
}

export interface ApiExact extends ResponseConstant {
	index: string;
	data: SimpleEntry;
}

export interface LogJson extends ResponseConstant {
	data: Array<{
		time: string;
		ip: string;
		method: string;
		path: string;
		ua: string;
	}>;
}

export interface ApiResponse extends ResponseConstant {
	count: number;
	data: any;
}

export interface CategoriesResponse extends ResponseConstant {
	data: {
		[key: string]: string;
	};
}

export interface CategoriesSearchResponse extends OtherResponse {
	fields?: Array<string>;
	count: number;
}

export interface CategoriesSearch {
	fields?: boolean;
	limit?: number;
	filter: Array<string>;
}

export interface SearchAllResponse extends ResponseConstant {
	data: Array<SimpleEntry>;
	count: number;
}

export interface WebhookResponse {
	ts: number;
	event: string;
	index: string;
	secret: string;
	data: any;
}

export interface SimpleEntry {
	id: string;
	url: string;
	index: string;
	image: string;
	excerpt: string;
	title: string;
	keywords: Array<string>;
}

export interface AllIndexesResponse extends ResponseConstant {
	count: number;
	data: {
		[key: string]: number;
	};
}

export interface OtherResponse extends ResponseConstant {
	count: number;
	data: Array<Entry>;
}

export interface OthersImportBody {
	data: Array<Entry>;
	count: number;
	time_saved: number;
}

export interface OtherExactRes extends ResponseConstant {
	data: Entry;
}

export interface OtherExportRes extends ResponseConstant, OtherResponse {}

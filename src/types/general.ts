import { Tool } from './tools';
import { Blog } from './blogs';

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
		total: number;
		tools: number;
		blogs: number;
	};
}

export interface ApiExact extends ResponseConstant {
	index: string;
	data: Tool | Blog;
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

export interface Categories extends ResponseConstant {
	data: {
		[key: string]: string;
	};
}

export interface SearchAllResponse extends ResponseConstant {
	data: {
		tools: Array<Tool>;
		blogs: Array<Blog>;
	};
	count: number;
}

export interface WebhookResponse {
	ts: number;
	event: string;
	index: string;
	secret: string;
	data: any;
}

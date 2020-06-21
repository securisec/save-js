import { Tool } from './tools';
import { Blog } from './blogs';

export interface Api {
	total: number;
	tools: number;
	blogs: number;
	version: string;
}

export interface ApiVersion {
	name: string;
	version: string;
	author: string;
	twitter: string;
}

export interface ApiExact {
	index: string;
	data: Tool | Blog;
}

export interface LogJson {
	time: string;
	ip: string;
	method: string;
	path: string;
	ua: string;
}

export interface ApiResponse {
	count: number;
	data: any;
}

export interface Categories {
	[key: string]: string;
}

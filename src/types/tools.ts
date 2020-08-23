import { ApiResponse, ResponseConstant } from './general';
import { Entry } from './blogs';

export interface Tool extends Entry {
	stars: number;
	similar_tools: Array<SimilarTool>;
}

export interface SimilarTool {
	avatar: string;
	description: string;
	name: string;
	stars: number;
	url: string;
}

export interface ToolExactResponse extends ResponseConstant {
	data: Tool;
}

export interface ToolSearchFields {
	fields: 'title' | 'keyword' | 'similar' | 'excerpt';
}

export interface ToolSearchResponse extends ApiResponse {
	data: Array<Tool>;
}

export interface ToolSearchCategoriesResponse extends ToolSearchResponse {
	count: number;
	fields: Array<string>;
}

export interface ToolsUpdateBody {
	data: Array<Tool>;
	count: number;
	time_saved: number;
}

export interface ToolAdd {
	keywords: Array<string>;
	excerpt: string;
	image?: string;
	title: string;
	url: string;
	stars?: number;
}

export interface ToolExportRes {
	data: Array<Tool>;
	count: number;
	time_saved: number;
}

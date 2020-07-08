import { ApiResponse } from './general';

export interface Tool {
	id: string;
	categories: Array<string>;
	created_on: number;
	description: string;
	icon: string;
	image: string;
	name: string;
	title: string;
	url: string;
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

export interface ToolSearchFields {
	fields: 'name' | 'description' | 'categories' | 'similar';
}

export interface ToolSearchResponse extends ApiResponse {
	data: Array<Tool>;
}

export interface ToolSearchCategoriesResponse extends ToolSearchResponse {
	fields: Array<string>;
}

export interface ToolsUpdateBody {
	data: Array<Tool>;
	count: number;
	time_saved: number;
}

export interface ToolAdd {
	categories: Array<string>;
	description: string;
	icon?: string;
	image?: string;
	name: string;
	title?: string;
	url: string;
	stars?: number;
}

export interface ToolExportRes {
	data: Array<Tool>;
	count: number;
	time_saved: number;
}

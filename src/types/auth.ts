import { ResponseConstant } from './general';

export interface AuthResponse extends ResponseConstant {
	data: {
		username: string;
		apikey: string;
		admin: boolean;
	};
}

export interface AuthAllUsers extends ResponseConstant {
	data: Array<{
		username: string;
		admin: boolean;
	}>;
}

export interface AuthCreateUserResp extends ResponseConstant {
	data: {
		password: string;
		username: string;
		admin: boolean;
	};
}

import { ResponseConstant } from './general';

export interface AuthResponse extends ResponseConstant {
	data: {
		username: string;
		apikey: string;
		admin: boolean;
		user_id: string;
	};
}

export interface AuthAllUsers extends ResponseConstant {
	data: Array<{
		username: string;
		admin: boolean;
		user_id: string;
	}>;
}

export interface AuthCreateUserResp extends ResponseConstant {
	data: {
		password: string;
		username: string;
		admin: boolean;
	};
}

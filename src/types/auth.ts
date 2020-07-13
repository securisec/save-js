export interface AuthResponse {
	username: string;
	apikey: string;
	admin: boolean;
}

export interface AuthAllUsers {
	username: string;
	admin: boolean;
}

export interface AuthCreateUserResp extends AuthAllUsers {
	password: string;
}

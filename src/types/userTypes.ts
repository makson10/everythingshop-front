export interface IUserData {
	name: string;
	dateOfBirth: string;
	email: string;
	login: string;
	password: string;
}

export interface ILogInUserData {
	login: string;
	password: string;
}

export interface IGoogleUserData {
	id: string;
	name: string;
	email: string;
	picture: string;
}

export interface IUnionUserData {
	name: string | null;
	email: string | null;
	id?: string;
	picture?: string;
	dateOfBirth?: string;
	login?: string;
	password?: string;
}

export type UserDataType = IUnionUserData[];

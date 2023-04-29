export interface SignUpUserDataType {
	name: string;
	dateOfBirth: string;
	email: string;
	login: string;
	password: string;
}

export interface LogInUserDataType {
	login: string;
	password: string;
}

export interface IValidationProductData {
	photoFile: File;
	title: string;
	description: string;
	creator: string;
	price: number;
}
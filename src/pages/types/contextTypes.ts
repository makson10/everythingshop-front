export interface IProductData {
	title: string;
	description: string;
	photo_id: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export type CartUpdateContextType = {
	addProductToCard: (productData: IProductData) => void;
	deleteProduct: (deleteProductId: string) => void;
	deleteAllProducts: () => void;
};

export interface IUserData {
	name: string;
	dateOfBirth: string;
	email: string;
	login: string;
	password: string;
}

export interface GoogleUserData {
	id: string;
	name: string;
	email: string;
	picture: string;
}

export interface IUnionUserData {
	name: string;
	email: string;
	id?: string;
	picture?: string;
	dateOfBirth?: string;
	login?: string;
	password?: string;
}

export type UserDataType = IUnionUserData[];

export type UserDataContextType = {
	data: IUnionUserData | null;
};

export type UserDataUpdateContextType = {
	saveData: (credential: IUnionUserData) => void;
	deleteData: () => void;
	deleteTokens: () => void;
};

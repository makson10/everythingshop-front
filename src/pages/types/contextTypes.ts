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

interface IUnionUserData {
	id: string;
	name: string;
	email: string;
	picture: string;
	dateOfBirth: string;
	login: string;
	password: string;
}

export type UserDataType = IUserData[] | GoogleUserData[];

export type UserDataContextType = {
	data: IUnionUserData | null;
};

export type UserDataUpdateContextType = {
	saveData: (credential: IUserData | GoogleUserData) => void;
	deleteData: () => void;
};

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

export type UserDataType = IUserData[];

export type UserDataContextType = {
	data: IUserData | null;
};

export type UserDataUpdateContextType = {
	saveData: (credential: IUserData) => void;
	deleteData: () => void;
};

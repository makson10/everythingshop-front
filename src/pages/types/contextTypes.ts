export interface IProductData {
	title: string | null;
	description: string | null;
	photo_id: string | null;
	creator: string | null;
	price: number | null;
	uniqueProductId: string | null;
}

export type CartUpdateContextType = {
	addProductToCard: (productData: IProductData) => void;
	deleteProduct: (deleteProductId: string) => void;
	deleteAllProducts: () => void;
};

export interface IUserData {
	name: string | null;
	age: string | number | null;
	email: string | null;
	login: string | null;
	password: string | null;
}

export type UserDataType = IUserData[];

export type UserDataContextType = {
	data: IUserData | null;
};

export type UserDataUpdateContextType = {
	saveData: (credential: IUserData) => void;
	deleteData: () => void;
};

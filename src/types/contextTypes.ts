import { IProduct } from './productTypes';
import { IUnionUserData } from './userTypes';

export type CartUpdateContextType = {
	addProductToCard: (productData: IProduct) => void;
	deleteProduct: (deleteProductId: string) => void;
	deleteAllProducts: () => void;
	decreaseProductAmount: (productId: string) => void;
	increaseProductAmount: (productId: string) => void;
};

export type UserDataContextType = {
	data: IUnionUserData | null;
	isLoading: boolean;
};

export type UserDataUpdateContextType = {
	saveData: (credential: IUnionUserData) => void;
	deleteData: () => void;
	deleteTokens: () => void;
};

export type ThemeContextType = boolean;

export type ThemeUpdateContextType = {
	toggleIsDarkTheme: () => void;
};

import { IUnionUserData } from './userTypes';
import { IProduct } from './productTypes';

export type UserDataContextType = {
	data: IUnionUserData | null;
	isLoading: boolean;
};

export type UpdateUserDataContextType = {
	saveData: (credential: IUnionUserData) => void;
	logOut: () => void;
};

export interface ICartProduct {
	amount: number;
	productsData: IProduct;
}

export type CartProductType = ICartProduct[];

export type UpdateCartContextType = {
	addProductToCard: (productData: IProduct) => void;
	addPhotoToProduct: (productId: string, photoObjectUrl: string) => void;
	deleteProduct: (deleteProductId: string) => void;
	deleteAllProducts: () => void;
	decreaseProductAmount: (productId: string) => void;
	increaseProductAmount: (productId: string) => void;
};

export type ThemeContextType = boolean;

export type UpdateThemeContextType = {
	toggleIsDarkTheme: () => void;
};

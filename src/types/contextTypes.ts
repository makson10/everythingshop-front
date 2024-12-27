import { IUnionUserData } from './userTypes';
import { IProduct } from './productTypes';

export type UserStoreValues = {
	data: IUnionUserData | null;
	isLoading: boolean;
};

export interface ICartProduct {
	amount: number;
	productsData: IProduct;
}

export type CartStoreValues = ICartProduct[];

export type UpdateCartContextType = {
	addProductToCard: (productData: IProduct) => void;
	addPhotoToProduct: (productId: string, photoObjectUrl: string) => void;
	deleteProduct: (deleteProductId: string) => void;
	deleteAllProducts: () => void;
	decreaseProductAmount: (productId: string) => void;
	increaseProductAmount: (productId: string) => void;
};

export type ThemeStoreValues = {
	isDarkTheme: boolean;
};

import { createContext, useEffect, useState, ReactNode } from 'react';
import { IProduct } from '@/types/productTypes';
import { CartProductType, UpdateCartContextType } from '@/types/contextTypes';

interface ProviderProps {
	children: ReactNode;
}

export const CartContext = createContext<CartProductType>([]);
export const UpdateCartContext = createContext<UpdateCartContextType>({
	addProductToCard: (product: IProduct) => {},
	addPhotoToProduct: (productId: string, photoObjectUrl: string) => {},
	deleteProduct: (deleteProductId: string) => {},
	deleteAllProducts: () => {},
	decreaseProductAmount: (productId: string) => {},
	increaseProductAmount: (productId: string) => {},
});

export function CartProvider({ children }: ProviderProps) {
	const [products, setProducts] = useState<CartProductType>([]);

	const addProductToCard = (productToAdd: IProduct) => {
		const existProducts = [...products];

		const foundSameProduct = existProducts.some(
			(product) =>
				product.productsData.uniqueProductId === productToAdd.uniqueProductId
		);

		if (foundSameProduct) {
			increaseProductAmount(productToAdd.uniqueProductId);
			return;
		}

		setProducts((prevValue) => {
			const newProducts = [
				...prevValue,
				{ amount: 1, productsData: productToAdd },
			];

			localStorage.setItem('cartProducts', JSON.stringify(newProducts));
			return newProducts;
		});
	};

	const addPhotoToProduct = (productId: string, photoObjectUrl: string) => {
		const newProducts = [...products];

		newProducts.map((product) => {
			if (product.productsData.uniqueProductId === productId) {
				product.productsData.imageObjectUrl = photoObjectUrl;
			}
		});

		setProducts(newProducts);
		localStorage.setItem('cartProducts', JSON.stringify(newProducts));
	};

	const deleteProduct = (deleteProductId: string) => {
		const newProducts = [...products];

		const appropriateProductIndex = products.findIndex(
			(product) => product.productsData.uniqueProductId === deleteProductId
		);

		if (appropriateProductIndex !== -1) {
			newProducts.splice(appropriateProductIndex, 1);
		}

		setProducts(newProducts);
		localStorage.setItem('cartProducts', JSON.stringify(newProducts));
	};

	const deleteAllProducts = () => {
		setProducts([]);
		localStorage.setItem('cartProducts', '[]');
	};

	const increaseProductAmount = (productId: string) => {
		const newProducts = [...products];

		newProducts.map((product) => {
			if (product.productsData.uniqueProductId === productId) product.amount++;
		});

		setProducts(newProducts);
		localStorage.setItem('cartProducts', JSON.stringify(newProducts));
	};

	const decreaseProductAmount = (productId: string) => {
		const newProducts = [...products];

		newProducts.map((product) => {
			if (product.productsData.uniqueProductId === productId) product.amount--;
		});

		setProducts(newProducts);
		localStorage.setItem('cartProducts', JSON.stringify(newProducts));
	};

	useEffect(() => {
		const cartProductsCookieValue = localStorage.getItem('cartProducts');
		if (cartProductsCookieValue)
			setProducts(JSON.parse(cartProductsCookieValue));
	}, []);

	return (
		<CartContext.Provider value={products}>
			<UpdateCartContext.Provider
				value={{
					addProductToCard,
					addPhotoToProduct,
					deleteProduct,
					deleteAllProducts,
					decreaseProductAmount,
					increaseProductAmount,
				}}>
				{children}
			</UpdateCartContext.Provider>
		</CartContext.Provider>
	);
}

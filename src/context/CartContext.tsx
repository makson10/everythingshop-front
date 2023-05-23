import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { IProduct, ProductType } from '@/types/productTypes';
import { CartUpdateContextType } from '@/types/contextTypes';

interface ProviderProps {
	children: ReactNode;
}

const CartContext = createContext<ProductType>([]);
const CartUpdateContext = createContext<CartUpdateContextType>({
	addProductToCard: (product: IProduct) => {},
	deleteProduct: (deleteProductId: string) => {},
	deleteAllProducts: () => {},
});

export function useCartContext() {
	return useContext(CartContext);
}

export function useCartUpdateContext() {
	return useContext(CartUpdateContext);
}

export function CartProvider({ children }: ProviderProps): JSX.Element {
	const [products, setProducts] = useState<ProductType>([]);

	function addProductToCard(product: IProduct) {
		setProducts((prevValue) => [...prevValue, product]);

		const alreadyExistProducts = localStorage.getItem('cartProducts');
		if (!alreadyExistProducts) {
			localStorage.setItem('cartProducts', JSON.stringify([product]));
			return;
		}

		const productList = JSON.parse(alreadyExistProducts);
		productList.push(product);
		localStorage.setItem('cartProducts', JSON.stringify(productList));
	}

	function deleteProduct(deleteProductId: string) {
		const newProducts = [...products];

		newProducts.map((product: IProduct, index: number) => {
			if (product.uniqueProductId === deleteProductId) {
				newProducts.splice(index, 1);
			}
		});

		setProducts(newProducts);
		localStorage.setItem('cartProducts', JSON.stringify(newProducts));
	}

	function deleteAllProducts() {
		setProducts([]);
		localStorage.removeItem('cartProducts');
	}

	useEffect(() => {
		const cartProducts = localStorage.getItem('cartProducts');
		cartProducts && setProducts(JSON.parse(cartProducts));
	}, []);

	return (
		<CartContext.Provider value={products}>
			<CartUpdateContext.Provider
				value={{ addProductToCard, deleteProduct, deleteAllProducts }}>
				{children}
			</CartUpdateContext.Provider>
		</CartContext.Provider>
	);
}

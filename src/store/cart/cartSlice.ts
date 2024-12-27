import { CartStoreValues } from '@/types/contextTypes';
import { IProduct } from '@/types/productTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartStoreValues = [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setProduct: (state, action) => {
			state.splice(0, state.length);
			state.push(...action.payload);
		},
		addProductToCard: (state, action) => {
			const newProduct: IProduct = action.payload;

			const productInCartId = state.findIndex(
				(product) =>
					product.productsData.uniqueProductId === newProduct.uniqueProductId
			);

			if (productInCartId === -1) {
				state.push({ amount: 1, productsData: newProduct });
			} else {
				state[productInCartId].amount += 1;
			}
		},
		deleteProduct: (state, action) => {
			const productId = action.payload;

			const productInCartId = state.findIndex(
				(product) => product.productsData.uniqueProductId === productId
			);

			state.splice(productInCartId, 1);
		},
		deleteAllProducts: (state) => {
			state.splice(0, state.length);
		},
		increaseProductAmount: (state, action) => {
			const productId = action.payload;

			const productInCartId = state.findIndex(
				(product) => product.productsData.uniqueProductId === productId
			);

			if (productInCartId !== -1) {
				state[productInCartId].amount += 1;
			}
		},
		decreaseProductAmount: (state, action) => {
			const productId = action.payload;

			const productInCartId = state.findIndex(
				(product) => product.productsData.uniqueProductId === productId
			);

			if (productInCartId !== -1) {
				state[productInCartId].amount -= 1;
			}
		},
	},
});

export const {
	setProduct,
	addProductToCard,
	deleteProduct,
	deleteAllProducts,
	increaseProductAmount,
	decreaseProductAmount,
} = cartSlice.actions;
export default cartSlice.reducer;

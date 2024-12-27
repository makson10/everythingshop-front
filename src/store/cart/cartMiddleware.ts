import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
	addProductToCard,
	decreaseProductAmount,
	deleteAllProducts,
	deleteProduct,
	increaseProductAmount,
} from './cartSlice';
import { RootState } from '../store';

const cartMiddleware = createListenerMiddleware();

cartMiddleware.startListening({
	matcher: isAnyOf(
		addProductToCard,
		deleteProduct,
		deleteAllProducts,
		increaseProductAmount,
		decreaseProductAmount
	),
	effect: async (action, listenerApi) => {
		const state = (listenerApi.getState() as RootState).cart;
		localStorage.setItem('cart', JSON.stringify(state));
	},
});

export default cartMiddleware;

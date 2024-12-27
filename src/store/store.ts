import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import cartReducer from './cart/cartSlice';
import cartMiddleware from './cart/cartMiddleware';

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			theme: themeReducer,
			cart: cartReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(cartMiddleware.middleware),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

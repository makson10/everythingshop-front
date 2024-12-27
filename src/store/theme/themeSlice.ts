import { ThemeStoreValues } from '@/types/contextTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ThemeStoreValues = {
	isDarkTheme: false,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setCurrentTheme: (state) => {
			const darkThemeCookieValue = localStorage.getItem('isDarkTheme');
			state.isDarkTheme = darkThemeCookieValue === 'true';
		},
		toggleTheme: (state) => {
			state.isDarkTheme = !state.isDarkTheme;
		},
	},
});

export const { setCurrentTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

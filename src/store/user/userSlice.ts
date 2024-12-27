import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getAndStoreUserData } from './userAsyncThunk';
import { UserStoreValues } from '@/types/contextTypes';

const initialState: UserStoreValues = {
	data: null,
	isLoading: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initializeUser: (state) => {
			state.data = initialState.data;
			state.isLoading = initialState.isLoading;
		},
		saveData: (state, action) => {
			state.data = action.payload;
		},
		logOut: (state) => {
			state.data = initialState.data;
			state.isLoading = initialState.isLoading;

			Cookies.remove('token');
			Cookies.remove('googleToken');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAndStoreUserData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAndStoreUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getAndStoreUserData.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { initializeUser, saveData, logOut } = userSlice.actions;
export default userSlice.reducer;

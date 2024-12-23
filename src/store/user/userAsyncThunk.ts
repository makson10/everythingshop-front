import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

export const getAndStoreUserData = createAsyncThunk(
	'user/getAndStoreUserData',
	async () => {
		const token = Cookies.get('token') ?? Cookies.get('googleToken');
		if (!token) return null;

		const isGoogleUser = !!Cookies.get('googleToken');

		const urlForFetch = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${
			isGoogleUser ? 'googleCustomers' : 'customers'
		}/verify`;

		const loginedUserData = await axios
			.post(urlForFetch, {
				token,
			})
			.then((res) => res.data);

		return loginedUserData;
	}
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

export const getAndStoreUserData = createAsyncThunk(
	'user/getAndStoreUserData',
	async () => {
		const jwtToken = Cookies.get('jwtToken') ?? Cookies.get('googleJWTToken');
		if (!jwtToken) return null;

		const isGoogleUser = !!Cookies.get('googleJWTToken');

		const urlForFetch = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${
			isGoogleUser ? 'googleCustomers' : 'customers'
		}/verify`;

		const loginedUserData = await axios
			.post(urlForFetch, {
				jwtToken: jwtToken,
			})
			.then((res) => res.data);

		return loginedUserData;
	}
);

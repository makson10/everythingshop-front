import { createContext, useEffect, useState } from 'react';
import useCookies from '@/hooks/useCookies';
import { IUnionUserData } from '@/types/userTypes';
import {
	UserDataContextType,
	UserDataUpdateContextType,
} from '@/types/contextTypes';
import axios from 'axios';

interface ProviderProps {
	children: React.ReactNode;
}

export const UserDataContext = createContext<UserDataContextType>({
	data: null,
});
export const UserDataUpdateContext = createContext<UserDataUpdateContextType>({
	saveData: (credential: IUnionUserData) => {},
	deleteData: () => {},
	deleteTokens: () => {},
});

const initialValue = {
	name: '',
	dateOfBirth: '',
	email: '',
	login: '',
	password: '',
	id: '',
	picture: '',
};

export function UserDataProvider({ children }: ProviderProps) {
	const { getCookies, removeCookies } = useCookies();
	const [data, setData] = useState<IUnionUserData>(initialValue);

	function saveData(credential: IUnionUserData) {
		setData(credential);
	}

	function deleteData() {
		setData(initialValue);
	}

	function deleteTokens() {
		removeCookies('jwtToken');
		removeCookies('googleJWTToken');
	}

	useEffect(() => {
		const getUserData = async () => {
			const jwtToken = getCookies('jwtToken');
			const googleJWTToken = getCookies('googleJWTToken');

			if (jwtToken) {
				await axios
					.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`)
					.catch((err) => {
						throw err;
					});
				const JWTTokenResult = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/jwtLogin`,
					{
						jwtToken: jwtToken,
					}
				);

				const userData = JWTTokenResult.data.data;
				if (userData.login && userData.password) {
					setData(JWTTokenResult.data.data);
				}
			} else if (googleJWTToken) {
				await axios
					.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers`)
					.catch((err) => {
						throw err;
					});
				const googleJWTTokenResult = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/jwtLogin`,
					{
						googleJWTToken: googleJWTToken,
					}
				);

				const userData = googleJWTTokenResult.data.data;
				if (userData.name && userData.id) {
					setData(googleJWTTokenResult.data.data);
				}
			}
		};

		getUserData();
	}, []);

	return (
		<UserDataContext.Provider value={{ data }}>
			<UserDataUpdateContext.Provider
				value={{ saveData, deleteData, deleteTokens }}>
				{children}
			</UserDataUpdateContext.Provider>
		</UserDataContext.Provider>
	);
}

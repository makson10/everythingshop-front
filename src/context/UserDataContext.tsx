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
	isLoading: false,
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
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			setIsLoading(true);

			const jwtToken = getCookies('jwtToken');
			const googleJWTToken = getCookies('googleJWTToken');

			try {
				if (jwtToken) {
					await axios.get(
						`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`
					);
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
					setIsLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getUserData();
	}, []);

	return (
		<UserDataContext.Provider value={{ data, isLoading }}>
			<UserDataUpdateContext.Provider
				value={{ saveData, deleteData, deleteTokens }}>
				{children}
			</UserDataUpdateContext.Provider>
		</UserDataContext.Provider>
	);
}

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
					const loginedUserData = await axios
						.post(
							`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/verify`,
							{
								jwtToken: jwtToken,
							}
						)
						.then((res) => res.data);

					if (loginedUserData.login && loginedUserData.password) {
						setData(loginedUserData);
					}
				} else if (googleJWTToken) {
					const loginedGoogleUserData = await axios
						.post(
							`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/verify`,
							{ jwtToken: googleJWTToken }
						)
						.then((res) => res.data);

					if (loginedGoogleUserData.id) setData(loginedGoogleUserData);
				}
			} catch (error) {
				console.error(error);
			}

			setIsLoading(false);
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

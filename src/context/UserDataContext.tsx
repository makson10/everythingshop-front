import { createContext, useEffect, useState, ReactNode } from 'react';
import useCookies from '@/hooks/useCookies';
import { IUnionUserData } from '@/types/userTypes';
import {
	UserDataContextType,
	UpdateUserDataContextType,
} from '@/types/contextTypes';
import axios from 'axios';

interface ProviderProps {
	children: ReactNode;
}

export const UserDataContext = createContext<UserDataContextType>({
	data: null,
	isLoading: false,
});
export const UpdateUserDataContext = createContext<UpdateUserDataContextType>({
	saveData: (credential: IUnionUserData) => {},
	deleteData: () => {},
});

const initialValue = {
	name: null,
	email: null,
};

export function UserDataProvider({ children }: ProviderProps) {
	const { getCookies, removeCookies } = useCookies();
	const [data, setData] = useState<IUnionUserData>(initialValue);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const saveData = (credential: IUnionUserData) => {
		setData(credential);
	};

	const deleteTokens = () => {
		removeCookies('jwtToken');
		removeCookies('googleJWTToken');
	};

	const deleteData = () => {
		setData(initialValue);
		deleteTokens();
	};

	const getAndStoreUserData = async (
		jwtToken: string,
		isGoogleUser: boolean
	) => {
		const urlForFetch = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${
			isGoogleUser ? 'googleCustomers' : 'customers'
		}/verify`;

		const loginedUserData = await axios
			.post(urlForFetch, {
				jwtToken: jwtToken,
			})
			.then((res) => res.data);

		if (
			loginedUserData.id ||
			(loginedUserData.login && loginedUserData.password)
		) {
			setData(loginedUserData);
		}
	};

	useEffect(() => {
		const getUserData = async () => {
			setIsLoading(true);

			const jwtToken = getCookies('jwtToken');
			const googleJWTToken = getCookies('googleJWTToken');

			try {
				if (jwtToken) {
					getAndStoreUserData(jwtToken, false);
				} else if (googleJWTToken) {
					getAndStoreUserData(googleJWTToken, true);
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
			<UpdateUserDataContext.Provider value={{ saveData, deleteData }}>
				{children}
			</UpdateUserDataContext.Provider>
		</UserDataContext.Provider>
	);
}

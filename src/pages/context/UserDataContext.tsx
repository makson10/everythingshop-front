import { createContext, useContext, useEffect, useState } from 'react';
import { IUnionUserData } from '@/pages/types/userTypes';
import {
	UserDataContextType,
	UserDataUpdateContextType,
} from '@/pages/types/contextTypes';
import { getCookie } from '../functions/cookiesFunction';
import axios from 'axios';

interface ProviderProps {
	children: React.ReactNode;
}

const UserDataContext = createContext<UserDataContextType>({ data: null });
const UserDataUpdateContext = createContext<UserDataUpdateContextType>({
	saveData: (credential: IUnionUserData) => {},
	deleteData: () => {},
	deleteTokens: () => {},
});

export function useUserData() {
	return useContext(UserDataContext);
}

export function useUserDataUpdate() {
	return useContext(UserDataUpdateContext);
}

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
	const [data, setData] = useState<IUnionUserData>(initialValue);

	function saveData(credential: IUnionUserData) {
		setData(credential);
	}

	function deleteData() {
		setData(initialValue);
	}

	function deleteTokens() {
		document.cookie = `jwtToken=; max-age=0;`;
		document.cookie = `googleJWTToken=; max-age=0;`;
	}

	useEffect(() => {
		const getUserData = async () => {
			const jwtToken = getCookie('jwtToken');
			const googleJWTToken = getCookie('googleJWTToken');

			if (jwtToken) {
				await axios.get('http://127.0.0.1:8000/customers').catch((err) => {
					throw err;
				});
				const JWTTokenResult = await axios.post(
					'http://127.0.0.1:8000/customers/jwtLogin',
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
					.get('http://127.0.0.1:8000/googleCustomers')
					.catch((err) => {
						throw err;
					});
				const googleJWTTokenResult = await axios.post(
					'http://127.0.0.1:8000/googleCustomers/jwtLogin',
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

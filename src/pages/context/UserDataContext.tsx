import { createContext, useContext, useEffect, useState } from 'react';
import {
	IUserData,
	UserDataContextType,
	UserDataUpdateContextType,
} from '@/pages/types/contextTypes';
import axios from 'axios';
import { GoogleUserData } from '@/pages/types/contextTypes';

interface ProviderProps {
	children: React.ReactNode;
}

const UserDataContext = createContext<UserDataContextType>({ data: null });
const UserDataUpdateContext = createContext<UserDataUpdateContextType>({
	saveData: (credential: IUserData | GoogleUserData) => {},
	deleteData: () => {},
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

export function UserDataProvider({ children }: ProviderProps): JSX.Element {
	const [data, setData] = useState<IUserData | GoogleUserData>(initialValue);

	function saveData(credential: IUserData | GoogleUserData) {
		setData(credential);
	}

	function deleteData() {
		setData(initialValue);
	}

	useEffect(() => {
		const getUserData = async () => {
			const jwtToken = localStorage.getItem('jwtToken');
			const googleJWTToken = localStorage.getItem('googleJWTToken');

			if (jwtToken) {
				const csrfProtocol = axios
					.get('http://127.0.0.1:8000/customers')
					.catch((err) => {
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
				const csrfProtocol = axios
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
			<UserDataUpdateContext.Provider value={{ saveData, deleteData }}>
				{children}
			</UserDataUpdateContext.Provider>
		</UserDataContext.Provider>
	);
}

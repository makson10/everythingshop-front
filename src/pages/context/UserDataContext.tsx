import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface IUserData {
	name: string | null;
	age: string | number | null;
	email: string | null;
	login: string | null;
	password: string | null;
}

type UserDataContextType = {
	data: IUserData | null;
};

type UserDataUpdateContextType = {
	saveData: (credential: IUserData) => void;
	deleteData: () => void;
};

interface ProviderProps {
	children: React.ReactNode;
}

const UserDataContext = createContext<UserDataContextType>({ data: null });
const UserDataUpdateContext = createContext<UserDataUpdateContextType>({
	saveData: () => {},
	deleteData: () => {},
});

export function useUserData() {
	return useContext(UserDataContext);
}

export function useUserDataUpdate() {
	return useContext(UserDataUpdateContext);
}

const initialValue = {
	name: null,
	age: null,
	email: null,
	login: null,
	password: null,
};

export function UserDataProvider({ children }: ProviderProps): JSX.Element {
	const [data, setData] = useState<IUserData>(initialValue);

	function saveData(credential: IUserData) {
		setData(credential);
	}

	function deleteData() {
		setData(initialValue);
	}

	useEffect(() => {
		const getUserData = async () => {
			const jwtToken = localStorage.getItem('jwtToken');

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

				if (JWTTokenResult.data.data.login && JWTTokenResult.data.data.password) {
					setData(JWTTokenResult.data.data);
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

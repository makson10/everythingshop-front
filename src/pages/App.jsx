import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Shop from './components/shop/shop';
import SignIn from './components/signIn/SignIn';
import AllUsers from './components/AllUsers/AllUsers';
import RegForm from './components/RegForm/RegForm';
import UserDataProvider from '../context/UserContext';

export default function App() {
	return (
		<UserDataProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />}>
						Домашняя страница
					</Route>
                    <Route path="/allUsers" element={<AllUsers />}>
						Все пользователи
					</Route>
					<Route path="/shop" element={<Shop />}>
						Ассортимент
					</Route>
					<Route path="/signIn" element={<SignIn />}>
						Вход
					</Route>
					<Route path="/signUp" element={<RegForm />}>
						Вход
					</Route>
				</Routes>
			</BrowserRouter>
		</UserDataProvider>
	);
}
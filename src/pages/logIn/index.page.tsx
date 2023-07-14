import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserData, useUpdateUserData } from '@/hooks/useUserDataContext';
import useCookies from '@/hooks/useCookies';
import { ShowErrorNotification } from '@/components/ShowModalWindow/ShowModalWindow';
import UserAlreadyAuthorizedPage from '@/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import AuthorizationPageHeader from '@/components/AuthorizationPageHeader/AuthorizationPageHeader';
import GoogleAuthSection from '@/components/GoogleAuthSection/GoogleAuthSection';
import LogInForm from './LogInForm';
import { IUserData, ILogInUserData } from '@/types/userTypes';
import axios from 'axios';

export default function LogIn() {
	const userData = useUserData();
	const { saveData } = useUpdateUserData();
	const { setCookies } = useCookies();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmitForm = async (data: ILogInUserData) => {
		try {
			const jwtToken = await axios
				.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/login`,
					data
				)
				.then((res) => res.data.jwtToken);

			const fullUserData = await axios
				.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/verify`, {
					jwtToken: jwtToken,
				})
				.then((res) => res.data);

			setJWTTokenCookie(jwtToken);
			setAuthorizedUserDataToContext(fullUserData);
			redirectUserToHomePage();
		} catch (error: any) {
			console.log(error);
			const errorMessage =
				error.response?.data?.error || error.message || 'Something went wrong';
			setServerErrorMessage(errorMessage);
			handleFailure();
		}
	};

	const setJWTTokenCookie = (token: string) => {
		setCookies('jwtToken', token, {
			sameSite: 'Lax',
		});
	};

	const setAuthorizedUserDataToContext = (credentials: IUserData) => {
		saveData({
			name: credentials.name,
			dateOfBirth: credentials.dateOfBirth,
			email: credentials.email,
			login: credentials.login,
			password: credentials.password,
		});
	};

	const redirectUserToHomePage = () => {
		router.push('/');
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	useEffect(() => {
		if (userData.data?.name) setDidUserAuthorized(true);
	}, [userData]);

	if (didUserAuthorized) return <UserAlreadyAuthorizedPage />;

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorNotification error={serverErrorMessage} />
			)}

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<AuthorizationPageHeader pageTitle="Log in to your account" />
				<GoogleAuthSection actionType="login" />
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
					<LogInForm handleSubmitForm={handleSubmitForm} />

					<p className="mt-2 text-center text-base text-gray-500 dark:text-white">
						Already haven&apos;t account?{' '}
						<Link
							href="/signUp"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-orange-600 dark:hover:text-orange-500">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

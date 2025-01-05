import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ShowErrorNotification } from '@/components/ShowModalWindow/ShowModalWindow';
import UserAlreadyAuthorizedPage from '@/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import AuthorizationPageHeader from '@/components/AuthorizationPageHeader/AuthorizationPageHeader';
import GoogleAuthSection from '@/components/GoogleAuthSection/GoogleAuthSection';
import LogInForm from './LogInForm';
import { ILogInUserData } from '@/types/userTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveData } from '@/store/user/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LogIn() {
	const user = useAppSelector((state) => state.user.data);
	const dispatch = useAppDispatch();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmitForm = async (data: ILogInUserData) => {
		try {
			const authResponse = await axios
				.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/login`,
					data
				)
				.then((res) => res.data);

			console.log('authResponse', authResponse);

			dispatch(saveData(authResponse.user));
			Cookies.set('token', authResponse.token);
			router.push('/');
		} catch (error: any) {
			handleFailure(error);
		}
	};

	const handleFailure = (error: any) => {
		const errorMessage =
			error.response?.data!.error || error.message || 'Something went wrong';
		setServerErrorMessage(errorMessage);

		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	useEffect(() => {
		if (user?.name) setDidUserAuthorized(true);
	}, [user]);

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
							href="/signup"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-orange-600 dark:hover:text-orange-500">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

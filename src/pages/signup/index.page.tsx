import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSendEmail from '@/hooks/useSendEmail';
import { ShowErrorNotification } from '@/components/ShowModalWindow/ShowModalWindow';
import UserAlreadyAuthorizedPage from '@/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import AuthorizationPageHeader from '@/components/AuthorizationPageHeader/AuthorizationPageHeader';
import GoogleAuthSection from '@/components/GoogleAuthSection/GoogleAuthSection';
import SignUpForm from './SignUpForm';
import { IUserData } from '@/types/userTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveData } from '@/store/user/userSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function SignUp() {
	const userData = useAppSelector((state) => state.user.data);
	const dispatch = useAppDispatch();
	const { sendSignUpEmail } = useSendEmail();

	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmitForm = async (data: IUserData) => {
		try {
			const authResponse = await axios
				.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/register`,
					data
				)
				.then((res) => res.data);

			Cookies.set('token', authResponse.token);
			dispatch(saveData(authResponse.user));
			sendEmail(data.name, data.email);
			router.push('/');
		} catch (error: any) {
			handleFailure(error);
		}
	};

	const sendEmail = (name: string, email: string) => {
		sendSignUpEmail(email, { userName: name });
	};

	const handleFailure = (error: any) => {
		const errorMessage =
			error.response?.data?.error || error.message || 'Something went wrong';
		setServerErrorMessage(errorMessage);

		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	useEffect(() => {
		if (userData?.name) setDidUserAuthorized(true);
	}, [userData]);

	if (didUserAuthorized) return <UserAlreadyAuthorizedPage />;

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorNotification error={serverErrorMessage} />
			)}

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-10 lg:px-8">
				<AuthorizationPageHeader pageTitle="Create new account" />
				<GoogleAuthSection actionType="register" />
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
					<SignUpForm handleSubmitForm={handleSubmitForm} />

					<p className="mt-2 text-center text-base text-gray-500 dark:text-white">
						Already have account?{' '}
						<Link
							href="/login"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-orange-600 dark:hover:text-orange-500">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

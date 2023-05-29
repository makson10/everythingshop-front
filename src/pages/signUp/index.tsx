import { useEffect, useState } from 'react';
import useValidation from '@/hooks/useValidation';
import { useUserData, useUserDataUpdate } from '@/hooks/useUserDataContext';
import { ShowErrorModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import { ISignUpUserData } from '@/types/validationTypes';
import UserAlreadyAuthorizedPage from '@/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import useIsPasswordVisible from '@/hooks/useIsPasswordVisible';
import useSendEmail from '@/hooks/useSendEmail';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';

export default function SignUp() {
	const isDarkTheme = useIsDarkTheme();
	const userData = useUserData();
	const { saveData } = useUserDataUpdate();
	const { sendSignUpEmail } = useSendEmail();
	const { validateSignUpData } = useValidation();

	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);
	const [signUpUserCredential, setSignUpUserCredential] =
		useState<ISignUpUserData>();
	const { isPasswordVisible, togglePasswordVisible } =
		useIsPasswordVisible(false);

	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const sendDataToServer = async (data: ISignUpUserData) => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`)
			.catch((err) => {
				throw err;
			});

		const saveDataResult = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/saveData`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (saveDataResult.data.error) {
			setIsServerError(true);
			setServerErrorMessage(saveDataResult.data.error);
			return;
		}

		const JWTTokenResult = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/register`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		Cookies.set('jwtToken', JWTTokenResult.data.jwtToken, {
			path: '/',
			sameSite: 'Lax',
		});

		setIsServerError(false);
		setSignUpUserCredential(data);
	};

	const handleSuccess = () => {
		router.push('/');
		saveData({
			name: signUpUserCredential!.name,
			dateOfBirth: signUpUserCredential!.dateOfBirth,
			email: signUpUserCredential!.email,
			login: signUpUserCredential!.login,
			password: signUpUserCredential!.password,
		});
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setIsServerError(null);
		}, 3000);
	};

	useEffect(() => {
		if (isServerError === null) return;
		isServerError ? handleFailure() : handleSuccess();
	}, [isServerError]);

	useEffect(() => {
		if (
			(userData.data?.login && userData.data?.password) ||
			userData.data?.id
		) {
			setDidUserAuthorized(true);
		}
	}, [userData]);

	if (didUserAuthorized) return <UserAlreadyAuthorizedPage />;

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorModalWindow errorList={[serverErrorMessage]} />
			)}

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-10 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src={
							isDarkTheme
								? 'everythingshop_logo.png'
								: 'everythingshop_logo_dark.png'
						}
						alt="My Company"
					/>
					<h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
						Create new account
					</h2>
				</div>
				<div className="flex justify-center mt-8">
					<GoogleButton
						action="Sign Up"
						redirectUrl="/api/auth/login?action_type=register"
					/>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
					<Formik
						initialValues={{
							name: '',
							dateOfBirth: '',
							email: '',
							login: '',
							password: '',
						}}
						validate={(values: ISignUpUserData) => {
							return validateSignUpData(values);
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								sendDataToServer(values);
								sendSignUpEmail(values.email, { userName: values.name });
								setSubmitting(false);
							}, 400);
						}}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor="name"
										className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
										Name
									</label>
									<div className="mt-2">
										<input
											id="name"
											name="name"
											type="text"
											autoComplete="email"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
										/>
										{errors.name && touched.name && errors.name}
									</div>
								</div>

								<div>
									<label
										htmlFor="dateOfBirth"
										className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
										Date of birth
									</label>
									<div className="mt-2">
										<input
											id="dateOfBirth"
											name="dateOfBirth"
											type="date"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.dateOfBirth}
										/>
										{errors.dateOfBirth &&
											touched.dateOfBirth &&
											errors.dateOfBirth}
									</div>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
										Email
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
										/>
										{errors.email && touched.email && errors.email}
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="login"
											className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
											Login
										</label>
									</div>
									<div className="mt-2">
										<input
											id="login"
											name="login"
											type="text"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.login}
										/>
										{errors.login && touched.login && errors.login}
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
											Password
										</label>
									</div>
									<div className="mt-2">
										<div className="flex flex-row gap-4">
											<input
												id="password"
												name="password"
												type={isPasswordVisible ? 'text' : 'password'}
												autoComplete="current-password"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
											<button
												className="block bg-white rounded-md border-0 py-1.5 px-1 shadow-sm ring-1 ring-inset ring-gray-300"
												tabIndex={-1}
												onClick={togglePasswordVisible}>
												<img
													src={isPasswordVisible ? './hide.png' : './show.png'}
													alt="#"
												/>
											</button>
										</div>
										{errors.password && touched.password && errors.password}
									</div>
								</div>

								<div>
									<button
										type="submit"
										disabled={isSubmitting}
										className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-orange-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-orange-600">
										Create account
									</button>
								</div>
							</form>
						)}
					</Formik>

					<p className="mt-2 text-center text-base text-gray-500 dark:text-white">
						Already have account?{' '}
						<Link
							href="/logIn"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-orange-600 dark:hover:text-orange-500">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

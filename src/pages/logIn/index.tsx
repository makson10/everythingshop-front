import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateLogInData } from '@/functions/validateFunctions';
import { useUserData, useUserDataUpdate } from '@/context/UserDataContext';
import { ISignUpUserData, ILogInUserData } from '@/types/validationTypes';
import { ShowErrorModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import UserAlreadyAuthorizedPage from '@/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { Formik } from 'formik';
import Link from 'next/link';
import axios from 'axios';

export default function LogIn() {
	const userData = useUserData();
	const { saveData } = useUserDataUpdate();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);

	const [logInUserCredential, setLogInUserCredential] =
		useState<ISignUpUserData>();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);

	const router = useRouter();

	const handleTogglePasswordVisible = (e: any) => {
		e.preventDefault();
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	const sendDataToServer = async (data: ILogInUserData) => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`)
			.catch((err) => {
				throw err;
			});

		const loginResult = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/dataLogin`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (loginResult.data.error) {
			setIsServerError(true);
			setServerErrorMessage(loginResult.data.error);
			return;
		}

		const userData = loginResult.data.userData;
		setLogInUserCredential(userData);

		const JWTTokenResult = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers/register`,
			userData
		);
		document.cookie = `jwtToken=${JWTTokenResult.data.jwtToken}; path=/; samesite=lax;`;

		setIsServerError(false);
	};

	const handleSuccess = () => {
		router.push('/');
		saveData({
			name: logInUserCredential!.name,
			dateOfBirth: logInUserCredential!.dateOfBirth,
			email: logInUserCredential!.email,
			login: logInUserCredential!.login,
			password: logInUserCredential!.password,
		});
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setIsServerError(null);
		}, 2000);
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

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="everythingshop_logo_dark.png"
						alt="My Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Log in to your account
					</h2>
				</div>

				<div className="flex justify-center mt-8">
					<GoogleButton
						action="Log In"
						redirectUrl="/api/auth/login?action_type=login"
					/>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
					<Formik
						initialValues={{
							login: '',
							password: '',
						}}
						validate={(values: ILogInUserData) => {
							return validateLogInData(values);
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								sendDataToServer(values);
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
									<div className="flex items-center justify-between">
										<label
											htmlFor="login"
											className="block text-lg font-medium leading-6 text-gray-900">
											Login
										</label>
									</div>
									<div className="mt-2">
										<input
											id="login"
											name="login"
											type="text"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
											className="block text-lg font-medium leading-6 text-gray-900">
											Password
										</label>
										<div className="text-lg">
											<a
												href=""
												tabIndex={-1}
												className="font-semibold focus:outline-none text-indigo-600 hover:text-indigo-500">
												Forgot password?
											</a>
										</div>
									</div>
									<div className="mt-2">
										<div className="flex flex-row gap-4">
											<input
												id="password"
												name="password"
												type={isPasswordVisible ? 'text' : 'password'}
												autoComplete="current-password"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
											<button
												className="block bg-white rounded-md border-0 py-1.5 px-1 shadow-sm ring-1 ring-inset ring-gray-300"
												tabIndex={-1}
												onClick={handleTogglePasswordVisible}>
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
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Log In
									</button>
								</div>
							</form>
						)}
					</Formik>

					<p className="mt-2 text-center text-base text-gray-500">
						Already haven't account?{' '}
						<Link
							href="/signUp"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

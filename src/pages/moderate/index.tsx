import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { validateLogInData } from '../functions/validateFunctions';
import { IAdminData } from '../types/adminTypes';
import { ShowErrorModalWindow } from '../components/ShowModalWindow/ShowModalWindow';
import { getCookie } from '../functions/cookiesFunction';
import { Formik } from 'formik';
import { ILogInUserData } from '../types/validationTypes';
import axios from 'axios';

export default function ModeratePage() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleTogglePasswordVisible = (e: any) => {
		e.preventDefault();
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	const checkAdminData = async (adminData: IAdminData) => {
		await axios
			.get('http://127.0.0.1:8000/customers')
			.catch((err) => console.error(err));

		const res = await axios.post(
			'http://127.0.0.1:8000/admins/checkAdminData',
			adminData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!res.data.adminWithReceivedDataExist) {
			setIsServerError(true);
			setServerErrorMessage("Admin with these credentials doesn't exist now");
			return;
		}

		setIsServerError(false);
	};

	const handleSuccess = () => {
		document.cookie = `isAdminAuthorized=true; max-age=${
			5 * 60
		}; path=/moderate; samesite=lax`;
		router.push(`${router.pathname}/adminPanel`);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setIsServerError(null);
		}, 3000);
	};

	useEffect(() => {
		const isAdminAuthorized = getCookie('isAdminAuthorized') === 'true';
		if (isAdminAuthorized) router.push('/moderate/adminPanel');
	}, []);

	useEffect(() => {
		if (isServerError === null) return;
		isServerError ? handleFailure() : handleSuccess();
	}, [isServerError]);

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorModalWindow errorList={[serverErrorMessage]} />
			)}

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#3c6255] text-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="everythingshop_logo.png"
						alt="My Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Log in to admin account
					</h2>
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
								checkAdminData(values);
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
											className="block text-lg font-medium leading-6">
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
											className="block text-lg font-medium leading-6">
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
												className="block w-[90%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
				</div>
			</div>
		</>
	);
}

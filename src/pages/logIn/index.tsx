import { useEffect, useState } from 'react';
import { validateLogInData } from '../functions/validateFunctions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUserData, useUserDataUpdate } from '../context/UserDataContext';
import {
	ShowErrorModalWindow,
	ShowSuccessModalWindow,
} from '../components/ShowModalWindow/ShowModalWindow';
import UserAlreadyAuthorizedPage from '../components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import { Formik } from 'formik';
import styles from './logIn.module.scss';
import { SignUpUserDataType } from '../types/validationTypes';

interface LogInUserDataType {
	login: string;
	password: string;
}

export default function LogIn() {
	const userData = useUserData();
	const { saveData } = useUserDataUpdate();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);

	const [logInUserCredential, setLogInUserCredential] =
		useState<SignUpUserDataType>();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleTogglePasswordVisible = () => {
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	const sendDataToServer = async (data: LogInUserDataType) => {
		const csrfProtocol = await axios
			.get('http://127.0.0.1:8000/customers')
			.catch((err) => {
				throw err;
			});

		const loginResult = await axios.post(
			'http://127.0.0.1:8000/customers/dataLogin',
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
			'http://127.0.0.1:8000/customers/register',
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
			{isOpenSuccessWindow && <ShowSuccessModalWindow action={'logging in'} />}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Log In</h1>
					<GoogleButton
						action="Log In"
						redirectUrl="/api/auth/login?action_type=login"
					/>
					<div className={styles['login-form-wrapper']}>
						<Formik
							initialValues={{
								login: '',
								password: '',
							}}
							validate={(values: LogInUserDataType) => {
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
								<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
									<div className="flex flex-col gap-2">
										<input
											id="form-input"
											placeholder="Enter your login"
											type="text"
											name="login"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.login}
										/>
										{errors.login && touched.login && errors.login}
										<div className="flex flex-row gap-1 w-input">
											<input
												id="form-input"
												data-type="password"
												type={isPasswordVisible ? 'text' : 'password'}
												name="password"
												placeholder="Enter your password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
											<div
												className="flex justify-center items-center"
												onClick={handleTogglePasswordVisible}>
												<img
													src={isPasswordVisible ? './hide.png' : './show.png'}
													alt="#"
												/>
											</div>
										</div>
										{errors.password && touched.password && errors.password}
									</div>
									<div className="flex flex-col gap-3 items-center">
										<button id="button" type="submit" disabled={isSubmitting}>
											Submit
										</button>
										<Link className={styles['sign-in-link']} href="/signUp">
											Not already registered? Sign Up
										</Link>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

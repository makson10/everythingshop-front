import React, { useEffect, useState } from 'react';
import { validateSignUpData } from '../functions/validateFunctions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
	useUserData,
	useUserDataUpdate,
} from '@/pages/context/UserDataContext';
import {
	ShowErrorModalWindow,
	ShowSuccessModalWindow,
} from '../components/ShowModalWindow/ShowModalWindow';
import { SignUpUserDataType } from '@/pages/types/validationTypes';
import UserAlreadyAuthorizedPage from '@/pages/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import { Formik } from 'formik';
import styles from './signUp.module.scss';

export default function SignUp() {
	const userData = useUserData();
	const { saveData } = useUserDataUpdate();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);

	const [signUpUserCredential, setSignUpUserCredential] =
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

	const sendDataToServer = async (data: SignUpUserDataType) => {
		const csrfProtocol = await axios
			.get('http://127.0.0.1:8000/customers')
			.catch((err) => {
				throw err;
			});

		const saveDataResult = await axios.post(
			'http://127.0.0.1:8000/customers/saveData',
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
			'http://127.0.0.1:8000/customers/register',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		document.cookie = `jwtToken=${JWTTokenResult.data.jwtToken}; path=/; samesite=lax;`;

		setIsServerError(false);
		setSignUpUserCredential(data);
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			saveData({
				name: signUpUserCredential!.name,
				dateOfBirth: signUpUserCredential!.dateOfBirth,
				email: signUpUserCredential!.email,
				login: signUpUserCredential!.login,
				password: signUpUserCredential!.password,
			});
		}, 3000);
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
			{isOpenSuccessWindow && <ShowSuccessModalWindow action={'registered'} />}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Sign up</h1>
					<GoogleButton
						action="Sign Up"
						redirectUrl="/api/auth/login?action_type=register"
					/>
					<div className={styles['registration-form-wrapper']}>
						<Formik
							initialValues={{
								name: '',
								dateOfBirth: '',
								email: '',
								login: '',
								password: '',
							}}
							validate={(values: SignUpUserDataType) => {
								return validateSignUpData(values);
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
											type="text"
											name="name"
											placeholder="Enter your name"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
										/>
										{errors.name && touched.name && errors.name}
										<input
											id="form-input"
											type="date"
											name="dateOfBirth"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.dateOfBirth}
											placeholder="Enter your date of birth"
										/>
										{errors.dateOfBirth &&
											touched.dateOfBirth &&
											errors.dateOfBirth}
										<input
											id="form-input"
											placeholder="Enter your email"
											type="text"
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
										/>
										{errors.email && touched.email && errors.email}
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
												className={styles['toggle-password-visible-button']}
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
										<Link className={styles['sign-in-link']} href="/logIn">
											Already registered? Log in
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

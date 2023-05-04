import React, { useEffect, useRef, useState } from 'react';
import {
	clearInputField,
	validateSignUpData,
} from '../functions/validateFunctions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
	useUserData,
	useUserDataUpdate,
} from '@/pages/context/UserDataContext';
import Button from '../components/Button/Button';
import {
	ShowErrorModalWindow,
	ShowSuccessModalWindow,
} from '../components/ShowModalWindow/ShowModalWindow';
import { SignUpUserDataType } from '@/pages/types/validationTypes';
import UserAlreadyAuthorizedPage from '@/pages/components/UserAlreadyAuthorizedPage/UserAlreadyAuthorizedPage';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import Input from '../components/Input/Input';
import { Formik, FormikErrors } from 'formik';
import styles from './signUp.module.scss';

export default function SignUp() {
	const userData = useUserData();
	const { saveData } = useUserDataUpdate();
	const [didUserAuthorized, setDidUserAuthorized] = useState<boolean>(false);

	const [name, setName] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputDateOfBirthRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputLoginRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [errorList, setErrorList] = useState<string[]>([]);
	const [mainValidateEnd, setMainValidateEnd] = useState<boolean>(false);
	const [secondaryValidateEnd, setSecondaryValidateEnd] =
		useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleDateOfBirthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDateOfBirth(e.target.value);
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLogin(e.target.value);
	};

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

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
			setErrorList((prevValue) => [saveDataResult.data.error]);
			setSecondaryValidateEnd(true);
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

		saveData({
			name: data.name,
			dateOfBirth: data.dateOfBirth,
			email: data.email,
			login: data.login,
			password: data.password,
		});

		setSecondaryValidateEnd(true);
	};

	// const handleSubmit = () => {
	// 	const user: SignUpUserDataType = {
	// 		name: name,
	// 		dateOfBirth: dateOfBirth,
	// 		email: email,
	// 		login: login,
	// 		password: password,
	// 	};

	// 	if (!checkDataOnNull(user)) {
	// 		setErrorList(validateSignUpData(user));
	// 	}

	// 	setMainValidateEnd(true);
	// };

	// const checkDataOnNull = ({
	// 	name,
	// 	dateOfBirth,
	// 	email,
	// 	login,
	// 	password,
	// }: SignUpUserDataType) => {
	// 	let haveEmptyField: boolean = false;

	// 	if (
	// 		name === '' ||
	// 		dateOfBirth === '' ||
	// 		email === '' ||
	// 		login === '' ||
	// 		password === ''
	// 	) {
	// 		setErrorList(['Some of your field is not fill!']);
	// 		haveEmptyField = true;
	// 	}

	// 	return haveEmptyField;
	// };

	// const clearAllInputVariables = () => {
	// 	setName('');
	// 	setDateOfBirth('');
	// 	setEmail('');
	// 	setLogin('');
	// 	setPassword('');
	// };

	// const handleSuccess = () => {
	// 	setIsOpenSuccessWindow(true);

	// 	clearInputField(
	// 		inputNameRef,
	// 		inputDateOfBirthRef,
	// 		inputEmailRef,
	// 		inputLoginRef,
	// 		inputPasswordRef
	// 	);
	// 	clearAllInputVariables();

	// 	if (buttonRef.current) buttonRef.current.disabled = true;
	// 	setTimeout(() => {
	// 		setIsOpenSuccessWindow(false);
	// 		router.push('/');
	// 		setMainValidateEnd(false);
	// 		setSecondaryValidateEnd(false);
	// 	}, 3000);
	// };

	// const handleFailure = () => {
	// 	setIsOpenErrorWindow(true);
	// 	if (buttonRef.current) buttonRef.current.disabled = true;

	// 	setTimeout(() => {
	// 		setIsOpenErrorWindow(false);
	// 		setErrorList([]);
	// 		if (buttonRef.current) buttonRef.current.disabled = false;
	// 		setMainValidateEnd(false);
	// 		setSecondaryValidateEnd(false);
	// 	}, 3000);
	// };

	// useEffect(() => {
	// 	if (!mainValidateEnd) return;

	// 	if (errorList.length === 0) {
	// 		const user: SignUpUserDataType = {
	// 			name: name,
	// 			dateOfBirth: dateOfBirth,
	// 			email: email,
	// 			login: login,
	// 			password: password,
	// 		};

	// 		sendDataToServer(user);
	// 	} else {
	// 		handleFailure();
	// 	}
	// }, [mainValidateEnd]);

	// useEffect(() => {
	// 	if (!secondaryValidateEnd) return;

	// 	if (errorList.length === 0) {
	// 		handleSuccess();
	// 	} else {
	// 		handleFailure();
	// 	}
	// }, [secondaryValidateEnd]);

	useEffect(() => {
		if (mainValidateEnd) return;

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
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={errorList} />}
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
								const errors: FormikErrors<SignUpUserDataType> = {};

								if (!values.name) {
									errors.name = 'Required';
								} else if (values.name.length < 3) {
									errors.name = 'Name is too short!';
								}

								if (!values.dateOfBirth) {
									errors.dateOfBirth = 'Required';
								}

								if (!values.email) {
									errors.email = 'Required';
								} else if (
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
								) {
									errors.email = 'Email is not valid!';
								}

								if (!values.login) {
									errors.login = 'Required';
								} else if (values.login.length < 8) {
									errors.login = 'Login is too short!';
								}

								if (!values.password) {
									errors.password = 'Required';
								} else if (values.password.length < 8) {
									errors.password = 'Password is too short!';
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));
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
								<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
									<input
										id="form-input"
										type="text"
										name="name"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										placeholder="Enter your name"
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
									<div className={styles['password-wrapper']}>
										<input
											id="form-input"
											className="w-11/12"
											type={isPasswordVisible ? 'text' : 'password'}
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											placeholder="Enter your password"
										/>
										<button
											className={styles['toggle-password-visible-button']}
											onClick={handleTogglePasswordVisible}>
											<img
												src={isPasswordVisible ? './hide.png' : './show.png'}
												alt="#"
											/>
										</button>
									</div>
									{errors.password && touched.password && errors.password}
									<div className="flex flex-col gap-3">
										<button type="submit" disabled={isSubmitting}>
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

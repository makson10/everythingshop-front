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
		localStorage.setItem('jwtToken', JWTTokenResult.data.jwtToken);

		saveData({
			name: data.name,
			dateOfBirth: data.dateOfBirth,
			email: data.email,
			login: data.login,
			password: data.password,
		});

		setSecondaryValidateEnd(true);
	};

	const handleSubmit = () => {
		const user: SignUpUserDataType = {
			name: name,
			dateOfBirth: dateOfBirth,
			email: email,
			login: login,
			password: password,
		};

		if (!checkDataOnNull(user)) {
			setErrorList(validateSignUpData(user));
		}

		setMainValidateEnd(true);
	};

	const checkDataOnNull = ({
		name,
		dateOfBirth,
		email,
		login,
		password,
	}: SignUpUserDataType) => {
		let haveEmptyField: boolean = false;

		if (
			name === '' ||
			dateOfBirth === '' ||
			email === '' ||
			login === '' ||
			password === ''
		) {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	};

	const clearAllInputVariables = () => {
		setName('');
		setDateOfBirth('');
		setEmail('');
		setLogin('');
		setPassword('');
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		clearInputField(
			inputNameRef,
			inputDateOfBirthRef,
			inputEmailRef,
			inputLoginRef,
			inputPasswordRef
		);
		clearAllInputVariables();

		if (buttonRef.current) buttonRef.current.disabled = true;
		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			setMainValidateEnd(false);
			setSecondaryValidateEnd(false);
		}, 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);
		if (buttonRef.current) buttonRef.current.disabled = true;

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setErrorList([]);
			if (buttonRef.current) buttonRef.current.disabled = false;
			setMainValidateEnd(false);
			setSecondaryValidateEnd(false);
		}, 3000);
	};

	useEffect(() => {
		if (!mainValidateEnd) return;

		if (errorList.length === 0) {
			const user: SignUpUserDataType = {
				name: name,
				dateOfBirth: dateOfBirth,
				email: email,
				login: login,
				password: password,
			};

			sendDataToServer(user);
		} else {
			handleFailure();
		}
	}, [mainValidateEnd]);

	useEffect(() => {
		if (!secondaryValidateEnd) return;

		if (errorList.length === 0) {
			handleSuccess();
		} else {
			handleFailure();
		}
	}, [secondaryValidateEnd]);

	useEffect(() => {
		if (mainValidateEnd) return;

		if (userData.data?.login && userData.data.password) {
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
					<div className={styles['registration-form-wrapper']}>
						<div className={styles['form-input-wrapper']}>
							<input
								ref={inputNameRef}
								className={styles['form-input']}
								placeholder="Enter your name"
								type="text"
								onChange={handleNameInput}
							/>
							<input
								ref={inputDateOfBirthRef}
								className={styles['form-input']}
								type="date"
								placeholder="Enter your date of birth"
								onChange={handleDateOfBirthInput}
							/>
							<input
								ref={inputEmailRef}
								className={styles['form-input']}
								type="text"
								placeholder="Enter your email"
								onChange={handleEmailInput}
							/>
							<input
								ref={inputLoginRef}
								className={styles['form-input']}
								type="text"
								placeholder="Enter your login"
								onChange={handleLoginInput}
							/>
							<div className={styles['password-wrapper']}>
								<input
									ref={inputPasswordRef}
									className={styles['form-input']}
									type={isPasswordVisible ? 'text' : 'password'}
									placeholder="Enter your password"
									onChange={handlePasswordInput}
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
						</div>
						<Button text="Submit" callbackFunc={handleSubmit} />
						<div className={styles['sign-in-link-wrapper']}>
							<Link className={styles['sign-in-link']} href="/logIn">
								Already registered? Log in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

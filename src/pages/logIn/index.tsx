import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	clearInputField,
	validateLogInData,
} from '../functions/validateFunctions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorWindow from '../components/ErrorWindow/ErrorWindow';
import SuccessWindow from '../components/SuccessWindow/SuccessWindow';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import styles from './logIn.module.scss';
import { useUserDataUpdate } from '../context/UserDataContext';

interface LogInUserDataType {
	login: string;
	password: string;
}

interface ErrorListType {
	errorList: string[];
}

interface ActionType {
	action: string;
}

const ShowErrorModalWindow = ({ errorList }: ErrorListType) => {
	return createPortal(
		<ErrorWindow errorList={errorList} />,
		document.querySelector('#portal')!
	);
};

const ShowSuccessModalWindow = ({ action }: ActionType) => {
	return createPortal(
		<SuccessWindow typeOfSuccess={action} />,
		document.querySelector('#portal')!
	);
};

export default function LogIn() {
	const { saveData } = useUserDataUpdate();

	const [login, setLogin] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	const inputLoginRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [errorList, setErrorList] = useState<string[]>([]);
	const [mainValidationEnd, setMainValidationEnd] = useState<boolean>(false);
	const [secondaryValidationEnd, setSecondaryValidationEnd] =
		useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLogin(e.target.value);
	};

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const handleSubmit = () => {
		const user: LogInUserDataType = {
			login: login!,
			password: password!,
		};

		if (!checkDataOnNull(user)) {
			setErrorList(validateLogInData(user));
		}

		setMainValidationEnd(true);
	};

	const checkDataOnNull = ({ login, password }: LogInUserDataType) => {
		let haveEmptyField: boolean = false;

		if (login === '' || password === '') {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	};

	const clearAllInputVariables = () => {
		setLogin('');
		setPassword('');
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
			setErrorList((prevValue) => [loginResult.data.error]);
		} else {
			const userData = loginResult.data.userData;
			saveData(userData);

			const JWTTokenResult = await axios.post(
				'http://127.0.0.1:8000/customers/register',
				userData
			);
			localStorage.setItem('jwtToken', JWTTokenResult.data.jwtToken);
		}

		setSecondaryValidationEnd((prevValue) => true);
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		clearInputField(inputLoginRef, inputPasswordRef);
		clearAllInputVariables();

		if (buttonRef.current) buttonRef.current.disabled = true;
		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			setMainValidationEnd(false);
			setSecondaryValidationEnd(false);
		}, 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);
		if (buttonRef.current) buttonRef.current.disabled = true;

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setErrorList([]);
			if (buttonRef.current) buttonRef.current.disabled = false;
			setMainValidationEnd(false);
			setSecondaryValidationEnd(false);
		}, 3000);
	};

	useEffect(() => {
		if (!mainValidationEnd) return;

		if (errorList.length === 0) {
			const user: LogInUserDataType = {
				login: login!,
				password: password!,
			};

			sendDataToServer(user);
		} else {
			handleFailure();
		}
	}, [mainValidationEnd]);

	useEffect(() => {
		if (!secondaryValidationEnd) return;
		console.log(errorList);

		if (errorList.length === 0) {
			handleSuccess();
		} else {
			handleFailure();
		}
	}, [secondaryValidationEnd]);

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={errorList} />}
			{isOpenSuccessWindow && <ShowSuccessModalWindow action={'logging in'} />}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Log In</h1>
					<div className={styles['login-form-wrapper']}>
						<div className={styles['login-input-wrapper']}>
							<input
								ref={inputLoginRef}
								className={styles['form-input']}
								type="text"
								placeholder="Enter your login"
								onChange={handleLoginInput}
							/>
							<input
								ref={inputPasswordRef}
								className={styles['form-input']}
								type="password"
								placeholder="Enter your password"
								onChange={handlePasswordInput}
							/>
						</div>
						<button
							ref={buttonRef}
							className={styles['sign-up-button']}
							onClick={handleSubmit}>
							Submit
						</button>
						<div className={styles['sign-up-link-wrapper']}>
							<Link className={styles['sign-up-link']} href="/signUp">
								Not registered yet? Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

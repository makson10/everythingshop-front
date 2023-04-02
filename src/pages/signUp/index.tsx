import React, { useEffect, useRef, useState } from 'react';
import {
	clearInputField,
	validateSignUpData,
} from '../functions/validateFunctions';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorWindow from '../components/ErrorWindow/ErrorWindow';
import SuccessWindow from '../components/SuccessWindow/SuccessWindow';
import axios from 'axios';
import styles from './signUp.module.scss';

interface SignUpUserDataType {
	name: string;
	age: string | number;
	email: string;
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

export default function SignUp() {
	const [name, setName] = useState<string | null>(null);
	const [age, setAge] = useState<string | number | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [login, setLogin] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputAgeRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputLoginRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [errorList, setErrorList] = useState<string[]>([]);
	const [validateEnd, setValidateEnd] = useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleAgeInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setAge(e.target.value);
	}

	function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setEmail(e.target.value);
	}

	function handleLoginInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setLogin(e.target.value);
	}

	function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setPassword(e.target.value);
	}

	async function sendDataToServer(data: SignUpUserDataType) {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
            .then(getcsrf => {
                axios.post('http://127.0.0.1:8000/customers', data);
            })
            .catch(err => { throw err });
	}

	function handleSubmit() {
		const user: SignUpUserDataType = {
			name: name!,
			age: age!,
			email: email!,
			login: login!,
			password: password!,
		};

		if (!checkDataOnNull(user)) {
			setErrorList(validateSignUpData(user));
		}

		setValidateEnd(true);
	}

	function checkDataOnNull({
		name,
		age,
		email,
		login,
		password,
	}: SignUpUserDataType) {
		let haveEmptyField: boolean = false;

		if (
			name === '' ||
			age === '' ||
			email === '' ||
			login === '' ||
			password === ''
		) {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	}

	function clearAllInputVariables() {
		setName('');
		setAge(0);
		setEmail('');
		setLogin('');
		setPassword('');
	}

	function handleSuccess() {
		const user: SignUpUserDataType = {
			name: name!,
			age: age!,
			email: email!,
			login: login!,
			password: password!,
		};

		sendDataToServer(user);
		// create function for send data to backend server
		setIsOpenSuccessWindow(true);

		clearInputField(
			inputNameRef,
			inputAgeRef,
			inputEmailRef,
			inputLoginRef,
			inputPasswordRef
		);
		clearAllInputVariables();

		if (buttonRef.current) buttonRef.current.disabled = true;
		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			setValidateEnd(false);
		}, 3000);
	}

	function handleFailure() {
		setIsOpenErrorWindow(true);
		if (buttonRef.current) buttonRef.current.disabled = true;

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setErrorList([]);
			if (buttonRef.current) buttonRef.current.disabled = false;
			setValidateEnd(false);
		}, 3000);
	}

	useEffect(() => {
		if (!validateEnd) return;

		if (errorList.length === 0) {
			handleSuccess();
		} else {
			handleFailure();
		}
	}, [validateEnd]);

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
								ref={inputAgeRef}
								className={styles['form-input']}
								type="number"
								placeholder="Enter your age"
								onChange={handleAgeInput}
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

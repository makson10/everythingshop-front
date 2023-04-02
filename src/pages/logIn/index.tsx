import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorWindow from '../components/ErrorWindow/ErrorWindow';
import SuccessWindow from '../components/SuccessWindow/SuccessWindow';
import styles from './logIn.module.scss';

export default function LogIn() {
	const router = useRouter();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [userData, setUserData] = useState({});
	const [loginedUser, setLoginedUser] = useState({});
	const [errorList, setErrorList] = useState(['fuck you']);

	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] = useState(false);

	const [validateEnd, setValidateEnd] = useState(false);
	const [startValidateLogin, setStartValidateLogin] = useState(false);
	const [haveError, setHaveError] = useState(false);

	const inputLoginRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// function clearInputField(...inputRefs) {
	// 	inputRefs.map((input) => (input.current.value = ''));
	// }

	// function clearAllInputVariables() {
	// 	setLogin('');
	// 	setPassword('');
	// }

	// function handleSuccess() {
	//     userDataContextUpdate(userData);

	// 	clearInputField(inputLoginRef, inputPasswordRef);
	// 	clearAllInputVariables();

	// 	setIsOpenSuccessWindow(true);
	// 	setErrorList([]);
	// 	setValidateEnd(false);
	// }

	// async function getAllUsers() {
	// 	const allUsers = await fetch('http://127.0.0.1:4000/users').then((data) =>
	// 		data.json()
	// 	);
	// 	return allUsers;
	// }

	// function compareUserData(allUsers) {
	// 	let isDataMatch = false;

	// 	allUsers.map((user) => {
	// 		if (
	// 			user.login === userData.login &&
	// 			user.password === userData.password
	// 		) {
	// 			isDataMatch = true;
	//             setLoginedUser(user);
	// 		}
	// 	});

	// 	if (!isDataMatch) {
	// 		setErrorList(['Your login or password does not match']);
	// 	}
	// }

	// async function haveUserRegistered() {
	// 	const allUsers = await getAllUsers();
	// 	compareUserData(allUsers);
	// 	setValidateEnd(true);
	// }

	// function redirectUserOnSuccess() {
	//     router.push('/');
	// }

	// function setValueInLocalStorage(key, value) {
	//     localStorage.setItem(key, value);
	// }

	// useEffect(() => {
	// 	const isError = gotError();
	// 	if (isError) setHaveError(isError);
	// 	else {
	// 		if (startValidateLogin) {
	// 			haveUserRegistered();
	// 			setStartValidateLogin(false);
	// 		}
	// 	}
	// }, [startValidateLogin]);

	// useEffect(() => {
	// 	const isError = gotError();
	// 	if (isError) setHaveError(isError);
	// 	else {
	// 		if (validateEnd) handleSuccess();
	// 	}
	// }, [validateEnd]);

	// useEffect(() => {
	// 	if (haveError === true) {
	// 		setIsOpenErrorWindow(true);
	// 		setHaveError(null);
	// 		setStartValidateLogin(false);
	// 		setValidateEnd(false);
	// 	}
	// }, [haveError]);

	// useEffect(() => {
	//     if (validateEnd) {
	//         setValueInLocalStorage('loginedUser', JSON.stringify(loginedUser));
	//     }
	// }, [loginedUser]);

	// useEffect(() => {
	// 	if (isOpenErrorWindow) {
	// 		buttonRef.current.disabled = true;
	// 		setTimeout(() => {
	// 			setIsOpenErrorWindow(false);
	// 			setErrorList([]);
	// 			buttonRef.current.disabled = false;
	// 		}, 3000);
	// 	}
	// }, [isOpenErrorWindow]);

	// useEffect(() => {
	// 	if (isOpenSuccessWindow) {
	// 		buttonRef.current.disabled = true;
	// 		setTimeout(() => {
	// 			setIsOpenSuccessWindow(false);
	//             redirectUserOnSuccess();
	// 		}, 3000);
	// 	}
	// }, [isOpenSuccessWindow]);

	return (
		<>
			{isOpenErrorWindow &&
				createPortal(
					<ErrorWindow errorList={errorList} />,
					document.querySelector('#root')!
				)}

			{isOpenSuccessWindow &&
				createPortal(
					<SuccessWindow typeOfSuccess={'signed in'} />,
					document.querySelector('#root')!
				)}

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
								// onChange={handleLoginInput}
							/>
							<input
								ref={inputPasswordRef}
								className={styles['form-input']}
								type="password"
								placeholder="Enter your password"
								// onChange={handlePasswordInput}
							/>
						</div>
						<button
							ref={buttonRef}
							className={styles['sign-up-button']}
							// onClick={handleSubmit}
						>
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

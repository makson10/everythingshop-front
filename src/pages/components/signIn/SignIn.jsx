import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import ErrorWindow from '../ErrorWindow/ErrorWindow';
import SuccessWindow from '../SuccessWindow/SuccessWindow';
import { useUserData, useUserDataUpdate } from "../../../context/UserContext";
import './SignIn.scss';

export default function SignIn() {
    const UserDataContext = useUserData();
    const userDataContextUpdate = useUserDataUpdate();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [userData, setUserData] = useState({});
	const [loginedUser, setLoginedUser] = useState({});
	const [errorList, setErrorList] = useState([]);

	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] = useState(false);

	const [validateEnd, setValidateEnd] = useState(false);
	const [startValidateLogin, setStartValidateLogin] = useState(false);
	const [haveError, setHaveError] = useState(false);
    
	const inputLoginRef = useRef();
	const inputPasswordRef = useRef();
	const buttonRef = useRef();

	const navigate = useNavigate();


	function handleLoginInput(e) {
		setLogin(e.target.value);
	}

	function handlePasswordInput(e) {
		setPassword(e.target.value);
	}

	function handleSubmit() {
		const user = {
			login: login,
			password: password,
		};

		if (checkDataOnNull(user)) {
			setValidateEnd(true);
			return;
		}

		validateData(user);
		setUserData(user);
		setStartValidateLogin(true);
	}

	function validateData({ login, password }) {
		validateLogin(login);
		validatePassword(password);
	}

	function checkDataOnNull({ login, password }) {
		let haveEmptyField = false;

		if (login === '' || password === '') {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	}

	function validateLogin(login) {
		if (!isString(login) || login.length < 8) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your login is not valid!',
			]);
		}
	}

	function validatePassword(password) {
		if (!isString(password) || password.length < 8) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your password is not valid!',
			]);
		}
	}

	function isString(data) {
		if (typeof data === 'string') return true;
	}

	function gotError() {
		const isError = errorList.length === 0;
		return !isError;
	}

	function clearInputField(...inputRefs) {
		inputRefs.map((input) => (input.current.value = ''));
	}

	function clearAllInputVariables() {
		setLogin('');
		setPassword('');
	}

	function handleSuccess() {
        userDataContextUpdate(userData);

		clearInputField(inputLoginRef, inputPasswordRef);
		clearAllInputVariables();

		setIsOpenSuccessWindow(true);
		setErrorList([]);
		setValidateEnd(false);
	}

	async function getAllUsers() {
		const allUsers = await fetch('http://127.0.0.1:4000/users').then((data) =>
			data.json()
		);
		return allUsers;
	}

	function compareUserData(allUsers) {
		let isDataMatch = false;

		allUsers.map((user) => {
			if (
				user.login === userData.login &&
				user.password === userData.password
			) {
				isDataMatch = true;
                setLoginedUser(user);    
			}
		});

		if (!isDataMatch) {
			setErrorList(['Your login or password does not match']);
		}
	}

	async function haveUserRegistered() {
		const allUsers = await getAllUsers();
		compareUserData(allUsers);
		setValidateEnd(true);
	}

    function redirectUserOnSuccess() {
        navigate('/');
    }

    function setValueInLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }


	useEffect(() => {
		const isError = gotError();
		if (isError) setHaveError(isError);
		else {
			if (startValidateLogin) {
				haveUserRegistered();
				setStartValidateLogin(false);
			}
		}
	}, [startValidateLogin]);

	useEffect(() => {
		const isError = gotError();
		if (isError) setHaveError(isError);
		else {
			if (validateEnd) handleSuccess();
		}
	}, [validateEnd]);

	useEffect(() => {
		if (haveError === true) {
			setIsOpenErrorWindow(true);
			setHaveError(null);
			setStartValidateLogin(false);
			setValidateEnd(false);
		}
	}, [haveError]);

    useEffect(() => {
        if (validateEnd) {
            setValueInLocalStorage('loginedUser', JSON.stringify(loginedUser));
        }
    }, [loginedUser]);

	useEffect(() => {
		if (isOpenErrorWindow) {
			buttonRef.current.disabled = true;
			setTimeout(() => {
				setIsOpenErrorWindow(false);
				setErrorList([]);
				buttonRef.current.disabled = false;
			}, 3000);
		}
	}, [isOpenErrorWindow]);

	useEffect(() => {
		if (isOpenSuccessWindow) {
			buttonRef.current.disabled = true;
			setTimeout(() => {
				setIsOpenSuccessWindow(false);                
                redirectUserOnSuccess();
			}, 3000);
		}
	}, [isOpenSuccessWindow]);

	return (
		<>
			{isOpenErrorWindow &&
				createPortal(
					<ErrorWindow errorList={errorList} />,
					document.querySelector('#root')
				)}

			{isOpenSuccessWindow &&
				createPortal(
					<SuccessWindow typeOfSuccess={'signed in'} />,
					document.querySelector('#root')
				)}

			<div id="form-wrapper">
				<h1 id="form-wrapper-title">Sign In</h1>
				<div className="login-form-wrapper">
					<div className="login-input-wrapper">
						<input
							ref={inputLoginRef}
							className="form-input"
							type="text"
							placeholder="Enter your login"
							onChange={handleLoginInput}
						/>
						<input
							ref={inputPasswordRef}
							className="form-input"
							type="password"
							placeholder="Enter your password"
							onChange={handlePasswordInput}
						/>
					</div>
					<button
						ref={buttonRef}
						className="sign-in-button"
						onClick={handleSubmit}>
						Sign in
					</button>
					<div className="sign-up-link-wrapper">
						<Link className="sign-up-link" to="/signUp">
							Not registered yet? Sign up
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

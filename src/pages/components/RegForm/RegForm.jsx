import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import ErrorWindow from '../ErrorWindow/ErrorWindow';
import SuccessWindow from '../SuccessWindow/SuccessWindow';
import './RegForm.scss';

export default function RegForm() {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [userData, setUserData] = useState({});

	const inputNameRef = useRef();
	const inputAgeRef = useRef();
	const inputEmailRef = useRef();
	const inputLoginRef = useRef();
	const inputPasswordRef = useRef();
	const buttonRef = useRef();

	const [errorList, setErrorList] = useState([]);
	const [haveError, setHaveError] = useState();
	const [validateEnd, setValidateEnd] = useState(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] = useState(false);

	const [serverResponce, setServerResponce] = useState('');

    const navigate = useNavigate();


	function handleNameInput(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleAgeInput(e) {
		e.preventDefault();
		setAge(e.target.value);
	}

	function handleEmailInput(e) {
		e.preventDefault();
		setEmail(e.target.value);
	}

	function handleLoginInput(e) {
		e.preventDefault();
		setLogin(e.target.value);
	}

	function handlePasswordInput(e) {
		e.preventDefault();
		setPassword(e.target.value);
	}

	function handleSubmit() {
		const user = {
			name: name,
			age: age,
			email: email,
			login: login,
			password: password,
		};

		if (checkDataOnNull(user)) {
			setValidateEnd(true);
			return;
		}

		validateData(user);
        setUserData(user);
		setValidateEnd(true);
	}

	function checkDataOnNull({ name, age, email, login, password }) {
		let haveEmptyField = false;

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

	function validateData({ name, age, email, login, password }) {
		validateName(name);
		validateAge(age);
		validateEmail(email);
		validateLogin(login);
		validatePassword(password);
	}

	function validateName(name) {
		if (!isString(name)) {
			setErrorList([...errorList, 'Your name is not valid!']);
			return;
		}

		if (name.length < 3) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your name is not valid!',
			]);
		}
	}

	function validateAge(age) {
		if (!isNumber(age)) {
			setErrorList([...errorList, 'Your age is not valid!']);
			return;
		}

		if (age < 7 || age > 100) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your age is not valid!',
			]);
		}
	}

	function validateEmail(email) {
		if (!isString(email)) {
			setErrorList([...errorList, 'Your email is not valid!']);
			return;
		}

		if (!email.includes('@')) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your email is not valid!',
			]);
		}
	}

	function validateLogin(login) {
		if (!isString(login)) {
			setErrorList([...errorList, 'Your login is not valid!']);
			return;
		}

		if (login.length < 8) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your login is not valid!',
			]);
		}
	}

	function validatePassword(password) {
		if (!isString(password)) {
			setErrorList([...errorList, 'Your password is not valid!']);
			return;
		}

		if (password.length < 8) {
			setErrorList((previousErrorList) => [
				...previousErrorList,
				'Your password is not valid!',
			]);
		}
	}

	function isString(data) {
		if (typeof data === 'string') return true;
	}

	function isNumber(data) {
		if (typeof +data === 'number') return true;
	}

	function gotError() {
		const isError = errorList.length === 0;
		return !isError;
	}

    function setLoginedUserInLS(data) {
        localStorage.setItem('loginedUser', JSON.stringify(data));
    }

	function handleSuccess() {
        setLoginedUserInLS(userData);
		sendDataOnServer(userData);

		clearInputField(
			inputNameRef,
			inputAgeRef,
			inputEmailRef,
			inputLoginRef,
			inputPasswordRef
		);
		clearAllInputVariables();

		setIsOpenSuccessWindow(true);
		setErrorList([]);
        setValidateEnd(false);
	}

	function sendDataOnServer(user) {
		fetch('http://127.0.0.1:4000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.text())
			.then((data) => setServerResponce(data));
	}

	function clearInputField(...inputRefs) {
		inputRefs.map((input) => (input.current.value = ''));
	}

	function clearAllInputVariables() {
		setName(null);
		setAge(null);
		setEmail(null);
		setLogin(null);
		setPassword(null);
	}

    function redirectUserOnSuccess() {
        navigate('/');
    }


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
				buttonRef.current.disabled = false;
                redirectUserOnSuccess();
			}, 3000);
		}
	}, [isOpenSuccessWindow]);

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
			setValidateEnd(false);
		}
	}, [haveError]);

	return (
		<>
			{isOpenErrorWindow &&
				createPortal(
					<ErrorWindow errorList={errorList} />,
					document.querySelector('#root')
				)}

			{isOpenSuccessWindow &&
				createPortal(<SuccessWindow typeOfSuccess={'registered'} />, document.querySelector('#root'))}

			<div id="form-wrapper">
                <h1 id='form-wrapper-title'>Sign up</h1>
				<div className="registration-form-wrapper">
					<div className="form-input-wrapper">
						<input
							ref={inputNameRef}
							className="form-input"
							placeholder="Enter your name"
							type="text"
							onChange={handleNameInput}
						/>
						<input
							ref={inputAgeRef}
							className="form-input"
							type="number"
							placeholder="Enter your age"
							onChange={handleAgeInput}
						/>
						<input
							ref={inputEmailRef}
							className="form-input"
							type="text"
							placeholder="Enter your email"
							onChange={handleEmailInput}
						/>
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
						className="sign-up-button"
						onClick={handleSubmit}>
						Sign up
					</button>
					<div className="sign-in-link-wrapper">
						<Link className="sign-in-link" to="/signIn">
							Already registered? Sign in
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

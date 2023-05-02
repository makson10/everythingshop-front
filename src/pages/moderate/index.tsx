import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Button from '@/pages/components/Button/Button';
import { validateLogInData } from '../functions/validateFunctions';
import axios from 'axios';
import { IAdminData } from '../types/adminDataTypes';
import { ShowErrorModalWindow } from '../components/ShowModalWindow/ShowModalWindow';
import Input from '../components/Input/Input';
import styles from './moderatePage.module.scss';
import { getCookie } from '../functions/cookiesFunction';

export default function ModeratePage() {
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
		const adminData: IAdminData = {
			login: login!,
			password: password!,
		};

		if (!checkDataOnNull(adminData)) {
			setErrorList(validateLogInData(adminData));
		}

		setMainValidationEnd(true);
	};

	const checkDataOnNull = ({ login, password }: IAdminData) => {
		let haveEmptyField: boolean = false;

		if (login === '' || password === '') {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	};

	const handleSecondCheck = () => {
		const adminData: IAdminData = {
			login: login!,
			password: password!,
		};

		checkAdminData(adminData);
	};

	const checkAdminData = async (adminData: IAdminData) => {
		const csrfToken = await axios
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
			setErrorList(["Admin with these credentials doesn't exist now"]);
		}
		setSecondaryValidationEnd(true);
	};

	const handleSuccess = () => {
		document.cookie = `isAdminAuthorized=true; max-age=${5 * 60}; path=/moderate; samesite=lax`;
		router.push(`${router.pathname}/adminPanel`);
		if (inputLoginRef.current) inputLoginRef.current.value = '';
		if (inputPasswordRef.current) inputPasswordRef.current.value = '';
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
		const isAdminAuthorized = getCookie('isAdminAuthorized') === 'true';
		if (isAdminAuthorized) router.push('/moderate/adminPanel');
	}, []);

	useEffect(() => {
		if (!mainValidationEnd) return;
		errorList.length === 0 ? handleSecondCheck() : handleFailure();
	}, [mainValidationEnd]);

	useEffect(() => {
		if (!secondaryValidationEnd) return;
		errorList.length === 0 ? handleSuccess() : handleFailure();
	}, [secondaryValidationEnd]);

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={errorList} />}

			<div id={styles['admin-login-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Admin Log In</h1>
					<div className={styles['login-form-wrapper']}>
						<div className={styles['login-input-wrapper']}>
							<Input
								inputRef={inputLoginRef}
								placeholder="Enter your admin login"
								onChangeFunction={handleLoginInput}
							/>
							<Input
								inputRef={inputPasswordRef}
								type="password"
								placeholder="Enter your admin password"
								onChangeFunction={handlePasswordInput}
							/>
						</div>
						<Button text="Submit" callbackFunc={handleSubmit} />
					</div>
				</div>
			</div>
		</>
	);
}

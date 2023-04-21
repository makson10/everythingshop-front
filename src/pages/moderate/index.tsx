import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import ErrorWindow from '@/pages/components/ErrorWindow/ErrorWindow';
import { useRef, useState } from 'react';
import Button from '@/pages/components/Button/Button';
import styles from './moderatePage.module.scss';

interface ErrorListType {
	errorMessage: string;
}

const ShowErrorModalWindow = ({ errorMessage }: ErrorListType) => {
	return createPortal(
		<ErrorWindow errorList={[errorMessage]} />,
		document.querySelector('#portal')!
	);
};

export default function ModeratePage() {
	const [login, setLogin] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	const inputLoginRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
	const [validationEnd, setValidationEnd] = useState<boolean>(false);
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
		// const user: LogInUserDataType = {
		// 	login: login!,
		// 	password: password!,
		// };
		// if (!checkDataOnNull(user)) {
		// 	setErrorList(validateLogInData(user));
		// }
		// setMainValidationEnd(true);
	};

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorMessage={errorMessage} />}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Admin Log In</h1>
					<div className={styles['login-form-wrapper']}>
						<div className={styles['login-input-wrapper']}>
							<input
								ref={inputLoginRef}
								className={styles['form-input']}
								type="text"
								placeholder="Enter your admin login"
								onChange={handleLoginInput}
							/>
							<input
								ref={inputPasswordRef}
								className={styles['form-input']}
								type="password"
								placeholder="Enter your admin password"
								onChange={handlePasswordInput}
							/>
						</div>
						<Button text="Submit" callbackFunc={handleSubmit} />
					</div>
				</div>
			</div>
		</>
	);
}

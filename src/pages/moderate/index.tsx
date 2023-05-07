import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { validateLogInData } from '../functions/validateFunctions';
import axios from 'axios';
import { IAdminData } from '../types/adminDataTypes';
import { ShowErrorModalWindow } from '../components/ShowModalWindow/ShowModalWindow';
import styles from './moderatePage.module.scss';
import { getCookie } from '../functions/cookiesFunction';
import Link from 'next/link';
import { Formik } from 'formik';
import { LogInUserDataType } from '../types/validationTypes';

export default function ModeratePage() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleTogglePasswordVisible = () => {
		setIsPasswordVisible((prevValue) => !prevValue);
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
			setIsServerError(true);
			setServerErrorMessage("Admin with these credentials doesn't exist now");
			return;
		}

		setIsServerError(false);
	};

	const handleSuccess = () => {
		document.cookie = `isAdminAuthorized=true; max-age=${
			5 * 60
		}; path=/moderate; samesite=lax`;
		router.push(`${router.pathname}/adminPanel`);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setIsServerError(null);
		}, 3000);
	};

	useEffect(() => {
		const isAdminAuthorized = getCookie('isAdminAuthorized') === 'true';
		if (isAdminAuthorized) router.push('/moderate/adminPanel');
	}, []);

	useEffect(() => {
		if (isServerError === null) return;

		isServerError ? handleFailure() : handleSuccess();
	}, [isServerError]);

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorModalWindow errorList={[serverErrorMessage]} />
			)}

			<div id={styles['admin-login-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Admin Log In</h1>
					<div className={styles['login-form-wrapper']}>
						<Formik
							initialValues={{
								login: '',
								password: '',
							}}
							validate={(values: LogInUserDataType) => {
								return validateLogInData(values);
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									checkAdminData(values);
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
												className="flex justify-center items-center"
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

import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { validateBuySubmitData } from '@/pages/functions/validateFunctions';
import { useUserData } from '@/pages/context/UserDataContext';
import {
	ShowErrorModalWindow,
	ShowSuccessModalWindow,
} from '@/pages/components/ShowModalWindow/ShowModalWindow';
import { useRouter } from 'next/router';
import { ISubmitForm, SubmitFormData } from '@/pages/types/productTypes';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import { Formik } from 'formik';
import styles from './SubmitMenu.module.scss';

interface Props {
	setIsOpenSubmitMenu: Dispatch<SetStateAction<boolean>>;
}

export default function SubmitMenu({ setIsOpenSubmitMenu }: Props) {
	const authorizedUserData = useUserData();
	const { deleteAllProducts } = useCartUpdateContext();

	const [useOldFullName, setUseOldFullName] = useState<boolean>(false);
	const [useOldEmail, setUseOldEmail] = useState<boolean>(false);

	const inputFirstNameRef = useRef<HTMLInputElement>(null);
	const inputLastNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);

	const [isError, setIsError] = useState<boolean | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleCloseButton = () => {
		setIsOpenSubmitMenu(false);
	};

	const handleUseOldFullNameInput = () => {
		setUseOldFullName((prevValue) => !prevValue);
	};

	const handleUseOldEmailInput = () => {
		setUseOldEmail((prevValue) => !prevValue);
	};

	const handleSubmit = (values: ISubmitForm) => {
		const fullName = `${values.firstName} ${values.lastName}` || 'fuck u';

		const userFullName = useOldFullName
			? typeof authorizedUserData.data?.name === 'string'
				? authorizedUserData.data?.name
				: fullName
			: fullName;
		const userEmail = useOldEmail
			? typeof authorizedUserData.data?.email === 'string'
				? authorizedUserData.data?.email
				: values.email
			: values.email;

		const submitFormData: SubmitFormData = {
			fullName: userFullName,
			email: userEmail,
			deliveryAddress: values.deliveryAddress,
		};

		console.log(submitFormData);
		handleSuccess();
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			deleteAllProducts();
		}, 3000);
	};

	useEffect(() => {
		if (inputFirstNameRef.current)
			inputFirstNameRef.current.disabled = useOldFullName;
		if (inputLastNameRef.current)
			inputLastNameRef.current.disabled = useOldFullName;
	}, [useOldFullName]);

	useEffect(() => {
		if (inputEmailRef.current) inputEmailRef.current.disabled = useOldEmail;
	}, [useOldEmail]);

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={[errorMessage]} />}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow successText="You bought these products 🥳" />
			)}

			<div id={styles['submit-form']}>
				<div id={styles['form-wrapper']}>
					<button
						id={styles['close-modal-menu-button']}
						onClick={handleCloseButton}>
						&times;
					</button>
					<h1 id={styles['form-wrapper-title']}>Buy Form</h1>
					<div className={styles['form-input-wrapper']}>
						<Formik
							initialValues={{
								firstName: '',
								lastName: '',
								useOldFullName: false,
								email: '',
								useOldEmail: false,
								deliveryAddress: '',
							}}
							validate={(values: ISubmitForm) => {
								return validateBuySubmitData(values);
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									handleSubmit(values);
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
								setFieldValue,
							}) => (
								<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
									<div className="flex flex-col gap-4">
										<input
											placeholder="Enter your first name"
											className={styles['form-input']}
											type="text"
											name="firstName"
											ref={inputFirstNameRef}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.firstName}
										/>
										{errors.firstName && touched.firstName && errors.firstName}
										<div className="flex flex-col gap-2">
											<input
												placeholder="Enter your last name"
												ref={inputLastNameRef}
												className={styles['form-input']}
												type="text"
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.lastName}
											/>
											{errors.lastName && touched.lastName && errors.lastName}
											<div className="flex flex-row items-center gap-3">
												<input
													type="checkbox"
													name="useOldFullName"
													onChange={() => {
														handleChange(event);
														handleUseOldFullNameInput();
													}}
													onBlur={handleBlur}
													checked={values.useOldFullName}
												/>
												<label
													className="cursor-pointer"
													htmlFor="useOldFullName"
													onClick={() => {
														handleUseOldFullNameInput();
														values.useOldFullName = !values.useOldFullName;
														setFieldValue(
															'useOldFullName',
															values.useOldFullName,
															false
														);
													}}>
													Use old full name
												</label>
												{errors.useOldFullName &&
													touched.useOldFullName &&
													errors.useOldFullName}
											</div>
										</div>
										<div className="flex flex-col gap-2">
											<input
												ref={inputEmailRef}
												placeholder="Enter your email"
												className={styles['form-input']}
												type="text"
												name="email"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.email}
											/>
											{errors.email && touched.email && errors.email}
											<div className="flex flex-row items-center gap-3">
												<input
													type="checkbox"
													name="useOldEmail"
													onChange={() => {
														handleChange(event);
														handleUseOldEmailInput();
													}}
													onBlur={handleBlur}
													checked={values.useOldEmail}
												/>
												<label
													className="cursor-pointer"
													htmlFor="useOldEmail"
													onClick={() => {
														handleUseOldEmailInput();
														values.useOldEmail = !values.useOldEmail;
														setFieldValue(
															'useOldEmail',
															values.useOldEmail,
															false
														);
													}}>
													Use old email
												</label>
												{errors.useOldEmail &&
													touched.useOldEmail &&
													errors.useOldEmail}
											</div>
										</div>
										<input
											type="text"
											placeholder="Enter your delivery address"
											className={styles['form-input']}
											name="deliveryAddress"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.deliveryAddress}
										/>
										{errors.deliveryAddress &&
											touched.deliveryAddress &&
											errors.deliveryAddress}
										<button
											className={styles['submit-button']}
											type="submit"
											disabled={isSubmitting}>
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

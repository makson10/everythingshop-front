import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useValidation from '@/hooks/useValidation';
import { useUserData } from '@/hooks/useUserDataContext';
import { useCartUpdateContext } from '@/hooks/useCartContext';
import useSendEmail from '@/hooks/useSendEmail';
import { ISubmitForm, SubmitFormData } from '@/types/formDataTypes';
import { Formik } from 'formik';

interface Props {
	setIsOpenSubmitBuyForm: Dispatch<SetStateAction<boolean>>;
	purchaseTotalPrice: number;
}
// TODO: spread this component to some small component
export default function SubmitBuyForm({
	setIsOpenSubmitBuyForm,
	purchaseTotalPrice,
}: Props) {
	const authorizedUserData = useUserData();
	const { deleteAllProducts } = useCartUpdateContext();
	const { sendBuyEmail } = useSendEmail();
	const { validateBuySubmitData } = useValidation();

	const [useAccountFullName, setUseAccountFullName] = useState<boolean>(true);
	const [useAccountEmail, setUseAccountEmail] = useState<boolean>(true);

	const inputFirstNameRef = useRef<HTMLInputElement>(null);
	const inputLastNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleCloseButton = () => {
		setIsOpenSubmitBuyForm(false);
	};

	const handleUseAccountFullNameInput = () => {
		setUseAccountFullName((prevValue) => !prevValue);
	};

	const handleUseAccountEmailInput = () => {
		setUseAccountEmail((prevValue) => !prevValue);
	};

	const handleSubmit = (values: ISubmitForm) => {
		const fullName = `${values.firstName} ${values.lastName}`;

		const userFullName = useAccountFullName
			? typeof authorizedUserData.data?.name === 'string'
				? authorizedUserData.data?.name
				: fullName
			: fullName;
		const userEmail = useAccountEmail
			? typeof authorizedUserData.data?.email === 'string'
				? authorizedUserData.data?.email
				: values.email
			: values.email;

		const submitFormData: SubmitFormData = {
			fullName: userFullName,
			email: userEmail,
			deliveryAddress: values.deliveryAddress,
		};

		sendBuyEmail(userEmail, {
			purchaseTotalPrice: purchaseTotalPrice,
			fullUserName: userFullName,
		});
		handleSuccess();
	};

	const handleSuccess = () => {
		router.push('/');
		deleteAllProducts();
	};

	useEffect(() => {
		if (inputFirstNameRef.current)
			inputFirstNameRef.current.disabled = useAccountFullName;
		if (inputLastNameRef.current)
			inputLastNameRef.current.disabled = useAccountFullName;
	}, [useAccountFullName]);

	useEffect(() => {
		if (inputEmailRef.current) inputEmailRef.current.disabled = useAccountEmail;
	}, [useAccountEmail]);

	return (
		<div className="z-50 fixed w-full h-screen bg-black/[0.6] flex justify-center items-center overflow-hidden dark:text-black max-sm:px-4">
			<div className="relative w-fit px-[4rem] py-[3rem] flex flex-col justify-center items-center gap-[30px] bg-white rounded-2xl max-sm:w-full">
				<button
					className="absolute left-[30px] top-[1rem] text-[2.5rem] h-fit transition-all ease-linear duration-100 hover:scale-[1.2] hover:text-[darkblue] dark:text-black dark:hover:text-[orange]"
					onClick={handleCloseButton}>
					&times;
				</button>
				<h1 className="text-[1.8rem] dark:text-black">Buy Form</h1>
				<div className="flex flex-col gap-4">
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							useAccountFullName: useAccountFullName,
							email: '',
							useAccountEmail: useAccountEmail,
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
										className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
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
											className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
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
												name="useAccountFullName"
												onChange={() => {
													handleChange(event);
													handleUseAccountFullNameInput();
												}}
												onBlur={handleBlur}
												checked={values.useAccountFullName}
											/>
											<label
												className="cursor-pointer"
												htmlFor="useAccountFullName"
												onClick={() => {
													handleUseAccountFullNameInput();
													values.useAccountFullName =
														!values.useAccountFullName;
													setFieldValue(
														'useAccountFullName',
														values.useAccountFullName,
														false
													);
												}}>
												Use account full name
											</label>
											{errors.useAccountFullName &&
												touched.useAccountFullName &&
												errors.useAccountFullName}
										</div>
									</div>
									<div className="flex flex-col gap-2">
										<input
											ref={inputEmailRef}
											placeholder="Enter your email"
											className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
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
												name="useAccountEmail"
												onChange={() => {
													handleChange(event);
													handleUseAccountEmailInput();
												}}
												onBlur={handleBlur}
												checked={values.useAccountEmail}
											/>
											<label
												className="cursor-pointer"
												htmlFor="useAccountEmail"
												onClick={() => {
													handleUseAccountEmailInput();
													values.useAccountEmail = !values.useAccountEmail;
													setFieldValue(
														'useAccountEmail',
														values.useAccountEmail,
														false
													);
												}}>
												Use account email
											</label>
											{errors.useAccountEmail &&
												touched.useAccountEmail &&
												errors.useAccountEmail}
										</div>
									</div>
									<input
										id="adderessInput"
										name="deliveryAddress"
										type="text"
										placeholder="Enter your delivery address"
										className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
									/>
									{errors.deliveryAddress &&
										touched.deliveryAddress &&
										errors.deliveryAddress}
									<button
										className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
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
	);
}

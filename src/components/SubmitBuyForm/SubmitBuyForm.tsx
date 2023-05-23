import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { validateBuySubmitData } from '@/functions/validateFunctions';
import { useUserData } from '@/context/UserDataContext';
import { useRouter } from 'next/router';
import { ISubmitForm, SubmitFormData } from '@/types/formDataTypes';
import { useCartUpdateContext } from '@/context/CartContext';
import { Formik, useField } from 'formik';
import { useSendEmail } from '@/hooks/useSendEmail';
import useGooglePlaceAutoComplete from '@/hooks/useGooglePlaceAutoComplete';

interface Props {
	setIsOpenSubmitBuyForm: Dispatch<SetStateAction<boolean>>;
	buyCost: number;
}

export default function SubmitBuyForm({
	setIsOpenSubmitBuyForm,
	buyCost,
}: Props) {
	const authorizedUserData = useUserData();
	const { deleteAllProducts } = useCartUpdateContext();
	const { sendBuyEmail } = useSendEmail();

	const [useOldFullName, setUseOldFullName] = useState<boolean>(false);
	const [useOldEmail, setUseOldEmail] = useState<boolean>(false);

	const inputFirstNameRef = useRef<HTMLInputElement>(null);
	const inputLastNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleCloseButton = () => setIsOpenSubmitBuyForm(false);

	const handleUseOldFullNameInput = () => {
		setUseOldFullName((prevValue) => !prevValue);
	};

	const handleUseOldEmailInput = () => {
		setUseOldEmail((prevValue) => !prevValue);
	};

	const handleSubmit = (values: ISubmitForm) => {
		const fullName = `${values.firstName} ${values.lastName}`;

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

		sendBuyEmail(userEmail, { buyCost: buyCost, fullUserName: userFullName });
		handleSuccess();
	};

	const handleSuccess = () => {
		router.push('/');
		deleteAllProducts();
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
		<div className="z-100 fixed w-full h-screen bg-black/[0.6] flex justify-center items-center overflow-hidden">
			<div className="relative block w-fit px-[4rem] py-[3rem] flex flex-col justify-center items-center gap-[30px] bg-white rounded-[30px]">
				<button
					className="absolute left-[30px] top-[1rem] text-[2.5rem] h-fit transition-all ease-linear duration-100 hover:scale-[1.2] hover:text-[darkblue]"
					onClick={handleCloseButton}>
					&times;
				</button>
				<h1 className="text-[1.8rem]">Buy Form</h1>
				<div className="flex flex-col gap-4">
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
									<DeliveryAddressInput name="deliveryAddress" type="text" />
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

const DeliveryAddressInput = (props: { name: string; type: string }) => {
	const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
	const [fields, meta, helpers] = useField(props.name);
	const inputAddressRef = useRef<HTMLInputElement | null>(null);
	let autoComplete: google.maps.places.Autocomplete;

	const handleAddressSelect = async () => {
		let addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
		helpers.setValue(
			`${addressObj.address1}, ${addressObj.adminArea1Long}, ${addressObj.countryShort}`
		);
	};

	useEffect(() => {
		const loadGoogleMaps = async () => {
			autoComplete = await googleAutoCompleteSvc.initAutoComplete(
				inputAddressRef.current!,
				handleAddressSelect
			);
		};

		loadGoogleMaps();
	}, []);

	return (
		<>
			<input
				id="adderessInput"
				ref={inputAddressRef}
				placeholder="Enter your delivery address"
				className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
				{...fields}
				{...props}
			/>
			{meta.error && meta.touched && meta.error}
		</>
	);
};

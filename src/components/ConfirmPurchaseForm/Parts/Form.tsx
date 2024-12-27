import { useEffect, useRef, useState } from 'react';
import { IConfirmPurchaseForm } from '@/types/formDataTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';

interface Props {
	handleSubmitForm: (values: IConfirmPurchaseForm) => void;
}

export default function Form({ handleSubmitForm }: Props) {
	const [useAccountFullName, setUseAccountFullName] = useState<boolean>(true);
	const [useAccountEmail, setUseAccountEmail] = useState<boolean>(true);

	const inputFirstNameRef = useRef<HTMLInputElement>(null);
	const inputLastNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);

	const toggleUseAccountFullName = () => {
		setUseAccountFullName((prevValue) => !prevValue);
	};

	const toggleUseAccountEmail = () => {
		setUseAccountEmail((prevValue) => !prevValue);
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
				validationSchema={Schema.BuySubmitValidateSchema}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						handleSubmitForm(values);
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
							{!useAccountFullName &&
								errors.firstName &&
								touched.firstName && (
									<p className="text-red-400">{errors.firstName}</p>
								)}
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
								{!useAccountFullName &&
									errors.lastName &&
									touched.lastName && (
										<p className="text-red-400">{errors.lastName}</p>
									)}
								<div
									className="flex flex-row items-center gap-3"
									onClick={() => {
										toggleUseAccountFullName();
										values.useAccountFullName = !values.useAccountFullName;
									}}>
									<input
										type="checkbox"
										name="useAccountFullName"
										onChange={handleChange}
										onBlur={handleBlur}
										checked={values.useAccountFullName}
									/>
									<label
										className="cursor-pointer"
										htmlFor="useAccountFullName">
										Use account full name
									</label>
									{errors.useAccountFullName &&
										touched.useAccountFullName && (
											<p className="text-red-400">{errors.useAccountFullName}</p>
										)}
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
								{!useAccountEmail &&
									errors.email &&
									touched.email && (
										<p className="text-red-400">{errors.email}</p>
									)}
								<div
									className="flex flex-row items-center gap-3"
									onClick={() => {
										toggleUseAccountEmail();
										values.useAccountEmail = !values.useAccountEmail;
									}}>
									<input
										type="checkbox"
										name="useAccountEmail"
										onChange={handleChange}
										onBlur={handleBlur}
										checked={values.useAccountEmail}
									/>
									<label className="cursor-pointer" htmlFor="useAccountEmail">
										Use account email
									</label>
									{errors.useAccountEmail &&
										touched.useAccountEmail && (
											<p className="text-red-400">{errors.useAccountEmail}</p>
										)}
								</div>
							</div>
							<input
								id="adderessInput"
								name="deliveryAddress"
								type="text"
								placeholder="Enter your delivery address"
								className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.deliveryAddress}
							/>
							{errors.deliveryAddress &&
								touched.deliveryAddress && (
									<p className="text-red-400">{errors.deliveryAddress}</p>
								)}
							<button
								className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
								type="submit"
								disabled={isSubmitting}>
								Confirm
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}

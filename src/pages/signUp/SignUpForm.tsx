import Image from 'next/image';
import useIsPasswordVisible from '@/hooks/useIsPasswordVisible';
import { IUserData } from '@/types/userTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';

interface Props {
	handleSubmitForm: (values: IUserData) => void;
}

export default function SignUpForm({ handleSubmitForm }: Props) {
	const { isPasswordVisible, togglePasswordVisible } =
		useIsPasswordVisible(false);

	return (
		<Formik
			initialValues={{
				name: '',
				dateOfBirth: '',
				email: '',
				login: '',
				password: '',
			}}
			validationSchema={Schema.SignUpValidateSchema}
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
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="name"
							className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
							Name
						</label>
						<div className="mt-2">
							<input
								id="name"
								name="name"
								type="text"
								autoComplete="email"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
							/>
							{errors.name && touched.name && errors.name}
						</div>
					</div>

					<div>
						<label
							htmlFor="dateOfBirth"
							className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
							Date of birth
						</label>
						<div className="mt-2">
							<input
								id="dateOfBirth"
								name="dateOfBirth"
								type="date"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.dateOfBirth}
							/>
							{errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth}
						</div>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
							Email
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
							{errors.email && touched.email && errors.email}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="login"
								className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
								Login
							</label>
						</div>
						<div className="mt-2">
							<input
								id="login"
								name="login"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.login}
							/>
							{errors.login && touched.login && errors.login}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
								Password
							</label>
						</div>
						<div className="mt-2">
							<div className="flex flex-row gap-4">
								<input
									id="password"
									name="password"
									type={isPasswordVisible ? 'text' : 'password'}
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-orange-600 sm:text-sm sm:leading-6"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								<button
									className="block bg-white rounded-md border-0 py-1.5 px-1 shadow-sm ring-1 ring-inset ring-gray-300"
									tabIndex={-1}
									onClick={(event) => {
										event.preventDefault();
										togglePasswordVisible();
									}}>
									<Image
										src={isPasswordVisible ? '/hide.png' : '/show.png'}
										alt="#"
										width={26}
										height={26}
									/>
								</button>
							</div>
							{errors.password && touched.password && errors.password}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-orange-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-orange-600">
							Create account
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
}

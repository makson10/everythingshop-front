import Image from 'next/image';
import useIsPasswordVisible from '@/hooks/useIsPasswordVisible';
import { ILogInUserData } from '@/types/userTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';

interface Props {
	handleSubmitForm: (values: ILogInUserData) => void;
}

export default function LogInForm({ handleSubmitForm }: Props) {
	const { isPasswordVisible, togglePasswordVisible } =
		useIsPasswordVisible(false);

	return (
		<Formik
			initialValues={{
				login: '',
				password: '',
			}}
			validationSchema={Schema.LogInValidateSchema}
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
							{errors.login && touched.login && (
								<p className="text-red-400">{errors.login}</p>
							)}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
								Password
							</label>
							<div className="text-lg">
								<a
									tabIndex={-1}
									className="font-semibold focus:outline-none text-indigo-600 hover:text-indigo-500 dark:text-orange-600 dark:hover:text-orange-500">
									Forgot password?
								</a>
							</div>
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
									onClick={togglePasswordVisible}>
									<Image
										src={isPasswordVisible ? '/hide.png' : '/show.png'}
										alt="#"
										width={26}
										height={26}
									/>
								</button>
							</div>
							{errors.password && touched.password && (
								<p className="text-red-400">{errors.password}</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-orange-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-orange-500">
							Log In
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
}

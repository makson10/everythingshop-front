import Image from 'next/image';
import useIsPasswordVisible from '@/hooks/useIsPasswordVisible';
import { IAdminData } from '@/types/adminTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';

interface FormProps {
	handleSubmitForm: (values: IAdminData) => void;
}

export default function AuthorizationForm({ handleSubmitForm }: FormProps) {
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
								className="block text-lg font-medium leading-6">
								Login
							</label>
						</div>
						<div className="mt-2">
							<input
								id="login"
								name="login"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
								className="block text-lg font-medium leading-6">
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
									className="block w-[90%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
							{errors.password && touched.password && errors.password}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-orange-600 dark:focus-visible:outline-orange-600">
							Log In
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
}

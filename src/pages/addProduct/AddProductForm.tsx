import Schema from '@/assets/validationSchemas';
import { FormProductType } from '@/types/productTypes';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { useUserData } from '@/hooks/useUserDataContext';

interface Props {
	photoFiles: File[];
	handleSubmitForm: (values: FormProductType) => void;
}

export default function AddProductForm({
	photoFiles,
	handleSubmitForm,
}: Props) {
	const authorizedUserData = useUserData();

	return (
		<Formik
			initialValues={{
				title: '',
				description: '',
				creator: authorizedUserData.data?.name!,
				price: 0,
				uniqueProductId: uuidv4(),
			}}
			validationSchema={Schema.AddNewProductValidateSchema}
			onSubmit={(values: FormProductType, { setSubmitting, resetForm }) => {
				setTimeout(() => {
					if (photoFiles) values.photoFiles = photoFiles;
					handleSubmitForm(values);

					resetForm();
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
					<div className="flex flex-col gap-4">
						<div>
							<input
								type="text"
								name="title"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Enter product title"
								maxLength={18}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
							/>
							{errors.title && touched.title && errors.title}
						</div>
						<div>
							<textarea
								name="description"
								className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Enter product description"
								maxLength={255}
								rows={5}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
							/>
							{errors.description && touched.description && errors.description}
						</div>
						<div>
							<input
								name="price"
								type="number"
								placeholder="Enter product price"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.price === 0 ? '' : values.price}
							/>
							{errors.price && touched.price && errors.price}
						</div>
					</div>
					<button
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						type="submit"
						disabled={isSubmitting}>
						Add product
					</button>
				</form>
			)}
		</Formik>
	);
}

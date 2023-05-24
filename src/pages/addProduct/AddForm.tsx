import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useValidation from '@/hooks/useValidation';
import { useUserData } from '@/hooks/useUserDataContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
	ShowSuccessModalWindow,
	ShowErrorModalWindow,
} from '@/components/ShowModalWindow/ShowModalWindow';
import { Formik } from 'formik';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';

interface ProductDataType {
	photoFile?: File;
	title: string;
	description: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export function AddForm() {
	const { validateAddNewProduct } = useValidation();
	const authorizationUserData = useUserData();

	const [fileInputLabel, setFileInputLabel] = useState<string>(
		'Enter product photo'
	);
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files) return;

		let file = e.target.files[0];
		file.name.length > 31
			? setFileInputLabel(file.name.slice(0, 26))
			: setFileInputLabel(file.name);

		setPhotoFile(file);
	};

	const clearFileInput = () => {
		if (fileInputRef.current) fileInputRef.current.value = '';
		setFileInputLabel('Enter product photo');
	};

	const sendDataToServer = async (user: ProductDataType) => {
		if (!user.photoFile) {
			setIsServerError(true);
			setServerErrorMessage('File field is empty!');
			return;
		}

		const formData = new FormData();
		formData.append('file', user.photoFile!);
		formData.append('title', user.title);
		formData.append('description', user.description);
		formData.append('creator', user.creator);
		formData.append('price', user.price.toString());
		formData.append('uniqueProductId', user.uniqueProductId);
		formData.append('comments', JSON.stringify([]));

		try {
			await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`);
			const addProductResult = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addNewProduct`,
				formData
			);

			if (!addProductResult.data.success) {
				setIsServerError(true);
				setServerErrorMessage(addProductResult.data.errorMessage || 'fuck');
				return;
			}

			setIsServerError(false);
		} catch (error) {
			console.error(error);
			setIsServerError(true);
		}
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setIsServerError(null);
		}, 3000);
	};

	useEffect(() => {
		photoFile && setFileInputLabel(photoFile.name);
	}, [photoFile]);

	useEffect(() => {
		if (isServerError === null) return;
		isServerError ? handleFailure() : handleSuccess();
	}, [isServerError]);

	if (!authorizationUserData.data?.name) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorModalWindow errorList={[serverErrorMessage]} />
			)}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow
					successText={'You have created your product successful'}
				/>
			)}

			<div className="flex-[2_1_auto] flex justify-center items-center">
				<div className="flex flex-col gap-8">
					<h1 className="text-4xl">Add new product</h1>
					<div className="flex flex-col">
						<div className="flex flex-col gap-4">
							<label className="cursor-pointer px-[12px] py-[6px] flex justify-center gap-[20px]">
								<img src="https://img.icons8.com/ios/50/null/upload-to-cloud--v1.png" />
								<p className="flex items-center">{fileInputLabel}</p>
								<input
									className="hidden"
									type="file"
									name="photoFile"
									accept="image/*"
									onChange={handleFileInput}
								/>
							</label>
							<Formik
								initialValues={{
									title: '',
									description: '',
									creator: authorizationUserData.data.name,
									price: 0,
									uniqueProductId: uuidv4(),
								}}
								validate={(values: ProductDataType) => {
									return validateAddNewProduct(values);
								}}
								onSubmit={(values, { setSubmitting, resetForm }) => {
									setTimeout(() => {
										if (photoFile) values.photoFile = photoFile;
										sendDataToServer(values);

										clearFileInput();
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
													ref={fileInputRef}
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
												{errors.description &&
													touched.description &&
													errors.description}
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

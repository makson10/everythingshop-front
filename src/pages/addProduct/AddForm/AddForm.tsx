import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateAddNewProduct } from '@/pages/functions/validateFunctions';
import { useUserData } from '@/pages/context/UserDataContext';
import UserNotLoginWindow from '../UserNotLoginWindow/UserNotLoginWindow';
import styles from './AddForm.module.scss';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
	ShowSuccessModalWindow,
	ShowErrorModalWindow,
} from '@/pages/components/ShowModalWindow/ShowModalWindow';
import { Formik } from 'formik';

interface ProductDataType {
	photoFile?: File;
	title: string;
	description: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export function AddForm() {
	const authorizationUserData = useUserData();

	const [fileInputLabel, setFileInputLabel] = useState<string>(
		'Enter product photo'
	);
	const [photoFile, setPhotoFile] = useState<File | null>(null);

	const [isServerError, setIsServerError] = useState<boolean | null>(null);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files) return;
		let file = e.target.files[0];

		if (file.name.length > 31) {
			setFileInputLabel(file.name.slice(0, 26));
		} else {
			setFileInputLabel(file.name);
		}

		setPhotoFile(file);
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

		try {
			const csrfToken = await axios.get('http://127.0.0.1:8000/products');

			const addProductResult = await axios.post(
				'http://127.0.0.1:8000/products/addNewProduct',
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

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
		}, 3000);
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
				<ShowSuccessModalWindow action={'added your product'} />
			)}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Add new product</h1>
					<div className={styles['form-wrapper']}>
						<div className={styles['input-wrapper']}>
							<label className={styles['form-file-input']}>
								<img src="https://img.icons8.com/ios/50/null/upload-to-cloud--v1.png" />
								<p className={styles['form-file-input-label']}>
									{fileInputLabel}
								</p>
								<input
									className={styles['file-input']}
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
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										if (photoFile) values.photoFile = photoFile;
										sendDataToServer(values);
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
										<div>
											<input
												className={styles['form-input']}
												type="text"
												name="title"
												placeholder="Enter product title"
												maxLength={18}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.title}
											/>
											{errors.title && touched.title && errors.title}
											<textarea
												name="description"
												className={styles['form-input']}
												placeholder="Enter product description"
												maxLength={255}
												rows={5}
												style={{ resize: 'none' }}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.description}
											/>
											{errors.description &&
												touched.description &&
												errors.description}
											<input
												type="number"
												name="price"
												placeholder="Enter product price"
												className={styles['form-input']}
												min={1}
												max={9999999}
												onChange={handleChange}
												onBlur={handleBlur}
												// value={values.price}
											/>
											{errors.price && touched.price && errors.price}
										</div>
										<button id="button" type="submit" disabled={isSubmitting}>
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

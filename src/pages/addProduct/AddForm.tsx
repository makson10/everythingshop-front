import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useUserData } from '@/hooks/useUserDataContext';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import {
	ShowSuccessModalWindow,
	ShowErrorModalWindow,
} from '@/components/ShowModalWindow/ShowModalWindow';
import { FieldArray, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Schema from '@/assets/validationSchemas';

interface ProductDataType {
	photoFiles?: File[];
	title: string;
	description: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export function AddForm() {
	const isDarkTheme = useIsDarkTheme();
	const authorizationUserData = useUserData();

	const [photoFiles, setPhotoFiles] = useState<File[]>([]);
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
		setPhotoFiles((prevValue) => [...prevValue, file]);
	};

	const clearFileInput = () => {
		setPhotoFiles([]);
	};

	const sendDataToServer = async (user: ProductDataType) => {
		if (!user.photoFiles) {
			setIsServerError(true);
			setServerErrorMessage('File field is empty!');
			return;
		}

		const formData = new FormData();
		user.photoFiles.map((file) => {
			formData.append('file', file);
		});
		formData.append('title', user.title);
		formData.append('description', user.description);
		formData.append('creator', user.creator);
		formData.append('price', user.price.toString());
		formData.append('uniqueProductId', user.uniqueProductId);
		formData.append('comments', JSON.stringify([]));

		try {
			const addProductResult = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addNewProduct`,
				formData
			);

			setIsServerError(false);
		} catch (error: any) {
			const errorMessage = error.response.data.error;
			setIsServerError(true);
			setServerErrorMessage(errorMessage);
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
		console.log(photoFiles);
	}, [photoFiles]);

	useEffect(() => {
		if (isServerError === null) return;
		isServerError ? handleFailure() : handleSuccess();
	}, [isServerError]);

	if (authorizationUserData.isLoading) {
		return <ShowLoadingScreen />;
	}

	if (!authorizationUserData.data?.name) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow error={serverErrorMessage} />}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow
					successText={'You have created your product successful'}
				/>
			)}

			<div className="flex-[2_1_auto] flex justify-center items-center p-6">
				<div className="flex flex-col gap-8 w-[350px]">
					<h1 className="text-4xl text-center">Add new product</h1>
					<div className="flex flex-col">
						<div className="flex flex-col gap-4">
							<div className="h-1/4">
								<Swiper
									modules={[Navigation, Pagination, A11y]}
									slidesPerView={1}
									navigation
									pagination={{ clickable: true }}>
									{photoFiles.map((file, index) => {
										const imageObjectUrl = URL.createObjectURL(file);
										return (
											<SwiperSlide key={index}>
												<img src={imageObjectUrl} alt="#" />
											</SwiperSlide>
										);
									})}
									{photoFiles.length < 5 && (
										<SwiperSlide>
											<label className="cursor-pointer px-[12px] py-[6px] flex justify-center gap-[20px]">
												<Image
													className="w-[50px] h-[50px]"
													src={`https://img.icons8.com/ios/50/${
														isDarkTheme ? 'ffffff' : '000000'
													}/upload-to-cloud--v1.png`}
													alt="#"
													width={100}
													height={100}
												/>
												<p className="flex items-center">Choose your photo</p>
												<input
													className="hidden"
													type="file"
													multiple
													name="photoFiles"
													accept="image/*"
													onChange={handleFileInput}
												/>
											</label>
										</SwiperSlide>
									)}
								</Swiper>
							</div>
							<Formik
								initialValues={{
									title: '',
									description: '',
									creator: authorizationUserData.data.name,
									price: 0,
									uniqueProductId: uuidv4(),
								}}
								validationSchema={Schema.AddNewProductValidateSchema}
								onSubmit={(
									values: ProductDataType,
									{ setSubmitting, resetForm }
								) => {
									setTimeout(() => {
										if (photoFiles) values.photoFiles = photoFiles;
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

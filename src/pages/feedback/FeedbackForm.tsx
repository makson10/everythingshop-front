import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { IFeedback } from '@/pages/types/feedbackTypes';
import { useUserData } from '@/pages/context/UserDataContext';
import UserNotLoginWindow from '@/pages/addProduct/UserNotLoginWindow/UserNotLoginWindow';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { validateFeedbaclData } from '@/pages/functions/validateFunctions';
import { ShowSuccessModalWindow } from '../components/ShowModalWindow/ShowModalWindow';

export default function FeedbackForm() {
	const authorizedUserData = useUserData();
	const [didUserAuthorized, setDidUserAuthorized] = useState(false);
	const [isOpenSuccessMenu, setIsOpenSuccessMenu] = useState<boolean>(false);

	const sendDataToServer = async (data: IFeedback) => {
		try {
			await axios.get('http://127.0.0.1:8000/feedback');
			await axios
				.post('http://127.0.0.1:8000/feedback/addNewFeedback', data)
				.then((res) => console.log(res));

			setIsOpenSuccessMenu(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setDidUserAuthorized(!!authorizedUserData.data?.name);
	}, [authorizedUserData]);

	if (!didUserAuthorized) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenSuccessMenu && (
				<ShowSuccessModalWindow successText="Thank you for your feedback. It is very important for us" />
			)}

			<div className="flex-[2_1_auto] flex justify-center items-center">
				<div className="flex flex-col gap-10">
					<p className="text-3xl text-center">Leave your feedback here</p>
					<Formik
						initialValues={{
							feedbackText: '',
						}}
						validate={(values: { feedbackText: string }) => {
							return validateFeedbaclData(values);
						}}
						onSubmit={(values, { setSubmitting, setFieldValue }) => {
							setTimeout(() => {
								const feedbackData: IFeedback = {
									userName: authorizedUserData.data?.name!,
									date: +new Date(),
									feedbackText: values.feedbackText,
									uniqueFeedbackId: uuidv4(),
								};
								sendDataToServer(feedbackData);
								setFieldValue('feedbackText', '', false);
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
									<textarea
										placeholder="Enter your feedback"
										className="block w-full h-56 rounded-md border-0 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
										name="feedbackText"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.feedbackText}
									/>
									{errors.feedbackText &&
										touched.feedbackText &&
										errors.feedbackText}
								</div>
								<button
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									type="submit"
									disabled={isSubmitting}>
									Send
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}

/*
<div className="flex-[2_1_auto] flex justify-center items-center">
				<div className="flex flex-col gap-8">
					<h1 className="text-4xl">Add new product</h1>
					<div className="flex flex-col">
						<div className="flex flex-col gap-4">
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
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
											</div>
											<div>
												<input
													type="number"
													name="price"
													placeholder="Enter product price"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													min={1}
													max={9999999}
													onChange={handleChange}
													onBlur={handleBlur}
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
*/

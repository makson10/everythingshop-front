import { useEffect, useState, useRef, LegacyRef } from 'react';
import { useUserData } from '@/pages/context/UserDataContext';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '@/pages/types/productTypes';
import { IComment, CommentType } from '@/pages/types/commentTypes';
import { Formik, FormikErrors } from 'formik';
import { ShowSuccessModalWindow } from '@/pages/components/ShowModalWindow/ShowModalWindow';
import axios from 'axios';
import { IValidateCommentsData } from '@/pages/types/validationTypes';
import { validateCommentsData } from '@/pages/functions/validateFunctions';

interface Props {
	productData: IProduct;
}

export default function ProductInfoBlock({ productData }: Props) {
	const authorizeUserData = useUserData();
	const { addProductToCard } = useCartUpdateContext();
	const [productComments, setProductComments] = useState<CommentType>(
		productData.comments
	);

	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const addToCartButtonRef = useRef<HTMLButtonElement>();
	const inputNewCommentRef = useRef<HTMLInputElement>();
	const sendNewCommentButtonRef = useRef<HTMLButtonElement>();

	const handleClickBuyButton = () => {
		setIsOpenSuccessWindow(true);

		const product = {
			title: productData?.title,
			description: productData?.description,
			photo_id: productData?.photo_id,
			creator: productData?.creator,
			price: productData?.price,
			uniqueProductId: uuidv4(),
			comments: productData.comments,
		};

		addProductToCard(product);
	};

	const sendCommentToServer = async (newCommentData: IComment) => {
		await axios.get('http://127.0.0.1:8000/products');
		await axios.post(
			`http://127.0.0.1:8000/products/addComment/${productData.uniqueProductId}`,
			newCommentData
		);

		const newComments = await axios
			.get(`http://127.0.0.1:8000/products/${productData.uniqueProductId}`)
			.then((res) => JSON.parse(res.data.data.comments));

		setProductComments(newComments);
	};

	useEffect(() => {
		if (addToCartButtonRef.current)
			addToCartButtonRef.current.disabled = !authorizeUserData.data?.name;

		if (sendNewCommentButtonRef.current)
			sendNewCommentButtonRef.current.disabled = !authorizeUserData.data?.name;
		if (inputNewCommentRef.current)
			inputNewCommentRef.current.disabled = !authorizeUserData.data?.name;
	}, [authorizeUserData]);

	useEffect(() => {
		if (!isOpenSuccessWindow) return;
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	}, [isOpenSuccessWindow]);

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow successText="You have successfully added this item to your cart" />
			)}

			<div className="pt-6">
				<nav aria-label="Breadcrumb">
					<ol
						role="list"
						className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						{/* Breadcrumb */}
						<li>
							<div className="flex items-center">
								<a
									href="/assortment"
									className="mr-2 text-sm font-medium text-gray-900">
									{'assortment'}
								</a>
								<svg
									width={16}
									height={20}
									viewBox="0 0 16 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300">
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>
						<li className="text-sm">
							<a
								aria-current="page"
								className="font-medium cursor-pointer text-gray-500 hover:text-gray-600">
								{productData.title}
							</a>
						</li>
					</ol>
				</nav>

				{/* Image gallery */}
				<div className="mx-auto mt-6 max-w-2xl sm:px-6">
					<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:block">
						<img
							src={`http://127.0.0.1:8000/products/image/${productData.photo_id}`}
							onError={(event) => {
								event.currentTarget.src =
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
								event.currentTarget.onerror = null;
							}}
							loading="lazy"
							className="h-full w-full object-contain object-center"
						/>
					</div>
				</div>

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{productData.title}
						</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							${productData.price}
						</p>

						{/* Reviews */}
						<div className="mt-6">
							<div className="flex items-center">
								<a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
									{productData.comments.length} reviews
								</a>
							</div>
						</div>
						<button
							ref={addToCartButtonRef as LegacyRef<HTMLButtonElement>}
							onClick={handleClickBuyButton}
							className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
							Add to bag
						</button>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						{/* Description and details */}
						<div className="flex flex-col gap-2">
							<h3 className="sr-only">Description</h3>

							<h3 className="text-xl font-bold">Description</h3>
							<div className="space-y-6">
								<p className="text-base text-gray-900 break-words">
									{productData.description}
								</p>
							</div>
						</div>
					</div>

					{/* Comments */}
					<div className="col-span-2 row-span-2">
						<div className="p-4 flex flex-col gap-4">
							{productComments.length ? (
								productComments.map((comment, index) => {
									return (
										<>
											<div
												className="bg-white rounded-lg shadow-lg"
												key={index}>
												<div className="p-4 col-span-2 row-span-2">
													<div className="flex items-center mb-2">
														<div className="w-10 h-10 mr-4">
															<img src={comment.picture} />
														</div>
														<div>
															<h2 className="text-lg font-medium text-gray-900">
																{comment.name}
															</h2>
															<p className="text-sm text-gray-500">
																{new Date(comment.date).toLocaleString()}
															</p>
														</div>
													</div>
													<p className="text-gray-700 leading-6">
														{comment.text}
													</p>
												</div>
											</div>
										</>
									);
								})
							) : (
								<div className="flex justify-center">
									No comments for this product
								</div>
							)}
						</div>
						<div className="p-4">
							<Formik
								initialValues={{
									newCommentText: '',
								}}
								validate={(values: IValidateCommentsData) => {
									return validateCommentsData(values);
								}}
								onSubmit={(
									values,
									{ setSubmitting, setFieldValue, setFieldTouched }
								) => {
									setTimeout(() => {
										const newCommentData = {
											name: authorizeUserData.data?.name!,
											date: +new Date(),
											picture:
												authorizeUserData.data?.picture ||
												'https://img.icons8.com/material-two-tone/24/null/guest-male--v1.png',
											text: values.newCommentText,
											uniqueCommentId: uuidv4(),
										};

										sendCommentToServer(newCommentData);
										setFieldValue('newCommentText', '', false);
										setFieldTouched('newCommentText', false, false);
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
									<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
										<div className="flex flex-row px-2 py-1">
											<input
												className="py-2 px-4 border border-gray-300 rounded-l-md flex-1"
												type="text"
												name="newCommentText"
												placeholder={
													authorizeUserData.data?.name
														? 'Enter comment'
														: 'Not available to unauthorized users'
												}
												ref={inputNewCommentRef as LegacyRef<HTMLInputElement>}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.newCommentText}
											/>
											<button
												className="disabled:opacity-30 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
												type="submit"
												disabled={isSubmitting}
												ref={
													sendNewCommentButtonRef as LegacyRef<HTMLButtonElement>
												}>
												<img src="https://img.icons8.com/windows/32/ffffff/sent.png" />
											</button>
										</div>
										{errors.newCommentText &&
											touched.newCommentText &&
											errors.newCommentText}
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

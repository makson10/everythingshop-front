import { useEffect, useState, useRef, LegacyRef } from 'react';
import { useUserData } from '@/pages/context/UserDataContext';
import { HintWindow } from './HintWindow/HintWindow';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { IComment, IProductData } from '@/pages/types/contextTypes';
import { ShowSuccessModalWindow } from '@/pages/components/ShowModalWindow/ShowModalWindow';
import { Formik, FormikErrors } from 'formik';
import styles from './ProductInfo.module.scss';
import axios from 'axios';

interface Props {
	productData: IProductData;
}

export default function ProductInfo({ productData }: Props) {
	const authorizeUserData = useUserData();
	const { addProductToCard } = useCartUpdateContext();
	const [productComments, setProductComments] = useState<IComment[]>(
		productData.comments
	);

	const [isAddToCartButtonDisable, setIsAddToCartButtonDisable] =
		useState<boolean>(false);
	const [isOpenHintWindow, setIsOpenHintWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const inputNewCommentRef = useRef<HTMLInputElement>();
	const sendNewCommentButtonRef = useRef<HTMLButtonElement>();

	const handleClick = () => {
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
		setIsAddToCartButtonDisable(!authorizeUserData.data?.name);
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
				<ShowSuccessModalWindow action={'added the product to cart'} />
			)}

			<div id={styles['content-wrapper']}>
				<div id={styles['photo-section']}>
					<img
						id={styles['photo']}
						src={`http://127.0.0.1:8000/products/image/${productData?.photo_id}`}
						onError={(event) => {
							event.currentTarget.src =
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
							event.currentTarget.onerror = null;
						}}
						loading="lazy"
					/>
				</div>
				<div id={styles['info-section']}>
					<div id={styles['main-info']}>
						<p id={styles['product-name']}>{productData?.title}</p>
						<p id={styles['description']}>{productData?.description}</p>
					</div>
					<div id={styles['secondary-info']}>
						<p id={styles['creator']}>Продавец: {productData?.creator}</p>
						<p id={styles['price']}>${productData?.price}</p>
					</div>
					<div id={styles['buy-button-wrapper']}>
						<button
							id={styles['buy-button']}
							onClick={handleClick}
							disabled={isAddToCartButtonDisable}
							onMouseOver={() =>
								isAddToCartButtonDisable && setIsOpenHintWindow(true)
							}
							onMouseOut={() =>
								isAddToCartButtonDisable && setIsOpenHintWindow(false)
							}>
							<img src="https://img.icons8.com/sf-black/32/null/buy.png" />
							{isOpenHintWindow && <HintWindow />}
						</button>
					</div>
					<div id={styles['comments-section']}>
						<div id={styles['comments-list']}>
							{productComments.length ? (
								productComments.map((comment, index) => {
									return (
										<div key={index}>
											<div className="flex flex-row gap-1">
												<img className="w-6 h-6" src={comment.picture} />
												{comment.name};{' '}
												{new Date(comment.date).toLocaleString()}
											</div>
											{comment.text}
										</div>
									);
								})
							) : (
								<div className="flex justify-center">
									No comments for this product
								</div>
							)}
						</div>
						<div id={styles['add-new-comment']}>
							<Formik
								initialValues={{
									newCommentText: '',
								}}
								validate={(values: { newCommentText: string }) => {
									const errors: FormikErrors<{ newCommentText: string }> = {};

									if (!values.newCommentText) {
										errors.newCommentText = 'Required!';
									} else if (values.newCommentText.length < 3) {
										errors.newCommentText = 'Comment is too short!';
									}

									return errors;
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
												id={styles['comment-input']}
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
												className="disabled:opacity-30"
												type="submit"
												disabled={isSubmitting}
												ref={
													sendNewCommentButtonRef as LegacyRef<HTMLButtonElement>
												}>
												<img src="https://img.icons8.com/windows/32/null/sent.png" />
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

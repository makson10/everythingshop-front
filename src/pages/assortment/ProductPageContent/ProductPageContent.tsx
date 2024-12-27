import { useState } from 'react';
import { ShowSuccessNotification } from '@/components/ShowModalWindow/ShowModalWindow';
import Breadcrumb from './Parts/Breadcrumb';
import Title from './Parts/Title';
import PhotoCarousel from './Parts/PhotoCarousel';
import Option from './Parts/Option';
import Details from './Parts/Details';
import Comments from './Parts/Comments';
import { IComment, CommentType } from '@/types/commentTypes';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProductToCard } from '@/store/cart/cartSlice';

interface Props {
	productData: IProduct;
}

export default function ProductPage({ productData }: Props) {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.data);
	const [productComments, setProductComments] = useState<CommentType>(
		productData.comments
	);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const sendCommentToServer = async (newCommentText: string) => {
		const newCommentData = shapeNewCommentData(newCommentText);

		await storeNewComment(newCommentData);
		await getAndSetNewComments();
	};

	const shapeNewCommentData = (newCommentText: string) => {
		const newComment = {
			author: user!.name!,
			date: +new Date(),
			picture:
				user!.picture ||
				'https://img.icons8.com/material-two-tone/24/null/guest-male--v1.png',
			text: newCommentText,
			uniqueCommentId: uuidv4(),
		};

		return newComment;
	};

	const storeNewComment = async (newCommentData: IComment) => {
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productData.uniqueProductId}/addComment`,
			newCommentData
		);
	};

	const getAndSetNewComments = async () => {
		const newComments = await axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productData._id}`
			)
			.then((res) => res.data.comments);

		setProductComments(newComments);
	};

	const handleClickBuyButton = () => {
		dispatch(addProductToCard(productData));
		openSuccessWindow();
	};

	const openSuccessWindow = () => {
		setIsOpenSuccessWindow(true);
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	};

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessNotification successText="You have successfully added this item to your cart" />
			)}

			<div className="pt-6">
				<Breadcrumb productTitle={productData.title} />
				<PhotoCarousel photoIds={productData.photoIds} />

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<Title title={productData.title} />
					<Option
						productPrice={productData.price}
						commentsAmount={productComments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>
					<Details productDescription={productData.description} />
					<Comments
						productComments={productComments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}

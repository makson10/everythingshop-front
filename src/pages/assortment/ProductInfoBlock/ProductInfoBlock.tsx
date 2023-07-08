import { useState } from 'react';
import { useUpdateCartContext } from '@/hooks/useCartContext';
import { ShowSuccessModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import Breadcrumb from './Parts/Breadcrumb';
import PhotoCarousel from './Parts/PhotoCarousel';
import Option from './Parts/Option';
import Details from './Parts/Details';
import Comments from './Parts/Comments';
import { IComment, CommentType } from '@/types/commentTypes';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	productData: IProduct;
}

export default function ProductInfoBlock({ productData }: Props) {
	const { addProductToCard } = useUpdateCartContext();

	const [productComments, setProductComments] = useState<CommentType>(
		productData.comments
	);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const sendCommentToServer = async (newCommentData: IComment) => {
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addComment/${productData.uniqueProductId}`,
			newCommentData
		);

		const newComments = await axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productData.uniqueProductId}`
			)
			.then((res) => res.data.comments);

		setProductComments(newComments);
	};

	const handleClickBuyButton = () => {
		addProductToCard(productData);
		openSuccessWindow();
	};

	const openSuccessWindow = () => {
		setIsOpenSuccessWindow(true);
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	};

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow successText="You have successfully added this item to your cart" />
			)}

			<div className="pt-6">
				<Breadcrumb productTitle={productData.title} />

				<PhotoCarousel productPhotoIds={productData.photo_id} />

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
							{productData.title}
						</h1>
					</div>

					<Option
						productPrice={productData.price}
						commentsAmount={productComments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						<Details productDescription={productData.description} />
					</div>

					<Comments
						productComments={productComments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}

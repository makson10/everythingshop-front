import { useEffect, useState } from 'react';
import { useUserData } from '@/pages/context/UserDataContext';
import { HintWindow } from './HintWindow/HintWindow';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { IProductData } from '@/pages/types/contextTypes';
import { ShowSuccessModalWindow } from '@/pages/components/ShowModalWindow/ShowModalWindow';
import styles from './ProductInfo.module.scss';

interface Props {
	productData: IProductData;
}

export default function ProductInfo({ productData }: Props) {
	const authorizeUserData = useUserData();
	const { addProductToCard } = useCartUpdateContext();

	const [isAddToCartButtonDisable, setIsAddToCartButtonDisable] =
		useState<boolean>(false);
	const [isOpenHintWindow, setIsOpenHintWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	function handleClick() {
		setIsOpenSuccessWindow(true);

		const product = {
			title: productData?.title,
			description: productData?.description,
			photo_id: productData?.photo_id,
			creator: productData?.creator,
			price: productData?.price,
			uniqueProductId: uuidv4(),
		};

		addProductToCard(product);
	}

	useEffect(() => {
		if (!authorizeUserData.data?.login && !authorizeUserData.data?.password) {
			setIsAddToCartButtonDisable(true);
		} else setIsAddToCartButtonDisable(false);
	}, [authorizeUserData]);

	useEffect(() => {
		if (!isOpenSuccessWindow) return;

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
		}, 3000);
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
				</div>
			</div>
		</>
	);
}

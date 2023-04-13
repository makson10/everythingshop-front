import SuccessWindow from '@/pages/components/SuccessWindow/SuccessWindow';
import { createPortal } from 'react-dom';
import styles from './ProductInfo.module.scss';
import { useEffect, useState } from 'react';

interface Props {
	productData: any;
}

interface ActionType {
	action: string;
}

const ShowSuccessModalWindow = ({ action }: ActionType) => {
	return createPortal(
		<SuccessWindow typeOfSuccess={action} />,
		document.querySelector('#portal')!
	);
};

export default function ProductInfo({ productData }: Props) {
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	function handleClick() {
		setIsOpenSuccessWindow(true);
		// later add func where add this product to cart
	}

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
						src={`http://127.0.0.1:8000/products/image/${productData?.photoId}`}
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
						<p id={styles['product-name']}>{productData?.productName}</p>
						<p id={styles['description']}>{productData?.description}</p>
					</div>
					<div id={styles['secondary-info']}>
						<p id={styles['creator']}>Продавец: {productData?.creator}</p>
						<p id={styles['price']}>${productData?.price}</p>
					</div>
					<div id={styles['buy-button-wrapper']}>
						<button id={styles['buy-button']} onClick={handleClick}>
							<img src="https://img.icons8.com/sf-black/32/null/buy.png" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

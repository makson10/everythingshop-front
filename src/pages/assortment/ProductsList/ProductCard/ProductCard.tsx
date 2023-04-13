import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';
import Link from 'next/link';

interface Props {
	productData: {
		title: string;
		description: string;
		photo_id: string;
		creator: string;
		price: number;
	};
}

export function ProductCard({ productData }: Props) {
	const [cardTitle, setCardTitle] = useState<string>(productData['title']);
	const [cardDescription, setCardDescription] = useState<string>(
		productData['description']
	);
	const [cardDescriptionForDisplay, setCardDescriptionForDisplay] =
		useState<string>(productData['description']);
	const [cardPhotoId, setCardPhotoId] = useState<string>(
		productData['photo_id']
	);
	const [cardCreator, setCardCreator] = useState<string>(
		productData['creator']
	);
	const [cardPrice, setCardPrice] = useState<number>(productData['price']);

	useEffect(() => {
		if (cardDescriptionForDisplay.length > 80) {
			setCardDescriptionForDisplay(`${cardDescription.slice(0, 80)}...`);
		}
	}, []);

	return (
		<div className={styles['card-wrapper']}>
			<img
				className={styles['card-photo']}
				src={`http://127.0.0.1:8000/products/image/${cardPhotoId}`}
				onError={(event) => {
					event.currentTarget.src =
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
					event.currentTarget.onerror = null;
				}}
                loading='lazy'
			/>
			<br />
			<Link
				className={styles['card-title']}
				href={`assortment/${cardTitle}?description=${cardDescription}&creator=${cardCreator}&price=${cardPrice}&photoId=${cardPhotoId}`}>
				{cardTitle}
			</Link>
			<br />
			<p className={styles['card-desc']}>{cardDescriptionForDisplay}</p>
			<br />
			<div className={styles['seller-data-row']}>
				<p className={styles['card-creator']}>{`Продав.:${cardCreator}`}</p>
				<p className={styles['card-price']}>{`$${cardPrice}`}</p>
			</div>
		</div>
	);
}

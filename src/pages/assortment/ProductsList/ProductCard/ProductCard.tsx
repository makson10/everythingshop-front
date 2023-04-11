import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';

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
	const [cardPhotoId, setCardPhotoId] = useState<string>(
		productData['photo_id']
	);
	const [cardCreator, setCardCreator] = useState<string>(
		productData['creator']
	);
	const [cardPrice, setCardPrice] = useState<number>(productData['price']);

	useEffect(() => {
		if (cardDescription.length > 80) {
			setCardDescription(`${cardDescription.slice(0, 80)}...`);
		}
	}, []);

	return (
		<div className={styles['card-wrapper']}>
			<img
				className={styles['card-photo']}
				src={
					'https://kartinkof.club/uploads/posts/2022-03/1648278549_1-kartinkof-club-p-mem-utka-s-nozhom-1.png'
				}
			/>
			<br />
			<p className={styles['card-title']}>{cardTitle}</p>
			<br />
			<p className={styles['card-desc']}>{cardDescription}</p>
			<br />
			<div className={styles['seller-data-row']}>
				<p className={styles['card-creator']}>{`Продав.:${cardCreator}`}</p>
				<p className={styles['card-price']}>{`$${cardPrice}`}</p>
			</div>
		</div>
	);
}

import { useEffect, useState } from 'react';
import { IProduct } from '@/pages/types/productTypes';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

interface Props {
	productData: IProduct;
}

export function ProductCard({ productData }: Props) {
	const [cardDescription, setCardDescription] = useState<string>(
		productData['description']
	);

	useEffect(() => {
		if (productData['description'].length > 80) {
			setCardDescription(`${productData['description'].slice(0, 80)}...`);
		} else {
			setCardDescription(productData['description']);
		}
	}, [productData]);

	return (
		<div className={styles['card-wrapper']}>
			<div className={styles['card-photo-wrapper']}>
				<img
					className={styles['card-photo']}
					src={`http://127.0.0.1:8000/products/image/${productData['photo_id']}`}
					onError={(event) => {
						event.currentTarget.src =
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
						event.currentTarget.onerror = null;
					}}
					loading="lazy"
				/>
			</div>
			<br />
			<Link
				className={styles['card-title']}
				href={`assortment/${productData['uniqueProductId']}`}>
				{productData['title']}
			</Link>
			<br />
			<p className={styles['card-desc']}>{cardDescription}</p>
			<br />
			<div className={styles['seller-data-row']}>
				<p className={styles['card-creator']}>
					{`Продав.:${productData['creator']}`}
				</p>
				<p className={styles['card-price']}>{`$${productData['price']}`}</p>
			</div>
		</div>
	);
}

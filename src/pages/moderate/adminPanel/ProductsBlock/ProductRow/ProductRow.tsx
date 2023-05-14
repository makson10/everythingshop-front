import { IProduct } from '@/pages/types/productTypes';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import styles from './ProductRow.module.css';

interface Props {
	product: IProduct;
}

export default function ProductRow({ product }: Props) {
	const router = useRouter();

	const handleClick = async () => {
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`);
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/deleteProduct/${product.uniqueProductId}`
		);

		router.reload();
	};

	return (
		<div id={styles['product-row']}>
			<div id={styles['main-info']}>
				<img
					id={styles['row-photo']}
					src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${product.photo_id}`}
					onError={(event) => {
						event.currentTarget.src =
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
						event.currentTarget.onerror = null;
					}}
					loading="lazy"
				/>
				<p>
					<Link
						id={styles['title-link']}
						href={`http://localhost:3000/assortment/${product.uniqueProductId}`}>
						<b>{product.title}</b>
					</Link>
					, {product.creator}
				</p>
			</div>
			<div id={styles['second-info']}>
				<p className="max-sm:text-[0.9rem]">${product.price}</p>
				<button id={styles['delete-button']} onClick={handleClick}>
					<img
						className="max-w-[30px]"
						src="https://img.icons8.com/windows/30/null/trash.png"
					/>
				</button>
			</div>
		</div>
	);
}

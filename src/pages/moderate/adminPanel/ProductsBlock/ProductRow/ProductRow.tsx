import { IProduct } from '@/pages/types/productTypes';
import styles from './ProductRow.module.scss';

interface Props {
	product: IProduct;
}

export default function ProductRow({ product }: Props) {
	const handleClick = () => {
		console.log(product.uniqueProductId);
	};

	return (
		<div id={styles['product-row']}>
			<div>
				<img
					id={styles['row-photo']}
					src={`http://127.0.0.1:8000/products/image/${product.photo_id}`}
					onError={(event) => {
						event.currentTarget.src =
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
						event.currentTarget.onerror = null;
					}}
					loading="lazy"
				/>
				<p>
					<b>{product.title}</b>, {product.creator}
				</p>
			</div>
			<div>
				<p>${product.price}</p>
				<button id={styles['delete-button']} onClick={handleClick}>
					<img src="https://img.icons8.com/windows/30/null/trash.png" />
				</button>
			</div>
		</div>
	);
}

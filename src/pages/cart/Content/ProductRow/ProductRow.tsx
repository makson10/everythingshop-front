import { useCartUpdateContext } from '@/pages/context/CartContext';
import { IProductData } from '@/pages/types/contextTypes';
import styles from './ProductRow.module.scss';

interface Props {
	productData: IProductData;
}

export function ProductRow({ productData }: Props) {
	const { deleteProduct } = useCartUpdateContext();

	const handleClick = () => {
		deleteProduct(productData?.uniqueProductId!);
	};

	return (
		<div id={styles['product-row']}>
			<div id={styles['main-product-data']}>
				<p id={styles['title']}>{productData.title}</p>
				<p id={styles['creator']}>{productData.creator}</p>
			</div>
			<div id={styles['secondary-product-data']}>
				<p id={styles['price']}>${productData.price}</p>
				<button id={styles['delete-button']} onClick={handleClick}>
					<img src="https://img.icons8.com/windows/30/null/trash.png" />
				</button>
			</div>
		</div>
	);
}

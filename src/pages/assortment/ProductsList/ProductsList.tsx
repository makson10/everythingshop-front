import { ProductCard } from '@/pages/assortment/ProductsList/ProductCard/ProductCard';
import styles from './ProductsList.module.scss';
import { ProductType } from '@/pages/types/productTypes';

interface Props {
	products: ProductType;
}

export function ProductsList({ products }: Props) {
	return (
		<div id={styles['product-list']}>
			{products.map((product, index) => {
				return <ProductCard key={index} productData={product} />;
			})}
		</div>
	);
}

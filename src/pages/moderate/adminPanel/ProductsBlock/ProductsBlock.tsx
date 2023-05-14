import { ProductType } from '@/pages/types/productTypes';
import ProductRow from './ProductRow/ProductRow';
import styles from './ProductsBlock.module.css';

interface Props {
	products: ProductType;
}

export default function ProductsBlock({ products }: Props) {
	return (
		<div id={styles['products-block']}>
			<p id={styles['block-title']}>Products</p>
			<div id={styles['products-list']}>
				{products.length === 0 ? (
					<div className="flex justify-center items-center h-full">
						<p className="text-xl">No products yet</p>
					</div>
				) : (
					products.map((product, index) => {
						return <ProductRow key={index} product={product} />;
					})
				)}
			</div>
		</div>
	);
}

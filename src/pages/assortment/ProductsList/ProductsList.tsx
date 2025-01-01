import { ProductCard } from './ProductCard';
import { ProductType } from '@/types/productTypes';

interface Props {
	products: ProductType;
}

export function ProductsList({ products }: Props) {
	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
			<div
				className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
				id="product-list">
				{products.map((product, index) => (
					<ProductCard key={index} product={product} />
				))}
			</div>
		</div>
	);
}

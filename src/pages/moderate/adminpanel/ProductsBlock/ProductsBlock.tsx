import { memo } from 'react';
import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { ProductType } from '@/types/productTypes';
import ProductRow from './ProductRow';

interface Props {
	products: ProductType;
}

export default function ProductsBlock({ products }: Props) {
	const ProductsList = memo(function ProductsList({ products }: Props) {
		return (
			<>
				{products.map((product, index) => {
					return <ProductRow key={index} product={product} />;
				})}
			</>
		);
	});

	return (
		<AdminPanelBlock blockTitle="Products">
			{products.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-xl">No products yet</p>
				</div>
			) : (
				<ProductsList products={products} />
			)}
		</AdminPanelBlock>
	);
}

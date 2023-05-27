import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { ProductType } from '@/types/productTypes';
import ProductRow from './ProductRow';

interface Props {
	products: ProductType;
}

export default function ProductsBlock({ products }: Props) {
	return (
		<AdminPanelBlock blockTitle="Products">
			{products.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-xl">No products yet</p>
				</div>
			) : (
				products.map((product, index) => {
					return <ProductRow key={index} product={product} />;
				})
			)}
		</AdminPanelBlock>
	);
}

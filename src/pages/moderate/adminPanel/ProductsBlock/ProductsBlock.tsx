import { ProductType } from '@/pages/types/productTypes';
import ProductRow from './ProductRow';

interface Props {
	products: ProductType;
}

export default function ProductsBlock({ products }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-[10px] max-sm:w-full">
			<p className="text-center text-[1.6rem] font-bold">Products</p>
			<div className="h-[200px] overflow-x-hidden overflow-y-scroll border-black border-[2px] p-4 flex flex-col gap-[10px] max-sm:h-[300px]">
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

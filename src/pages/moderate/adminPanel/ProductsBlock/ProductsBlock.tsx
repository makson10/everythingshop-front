import { useState, memo } from 'react';
import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { ProductType } from '@/types/productTypes';
import ProductRow from './ProductRow';
import axios from 'axios';

interface Props {
	products: ProductType;
}

export default function ProductsBlock({ products }: Props) {
	const [photoAccessKey, setPhotoAccessKey] = useState<string>('');

	const getPhotoAccessKey = async () => {
		const key = await axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
			)
			.then((res) => res.data.token);

		setPhotoAccessKey(key);
	};

	const ProductsList = memo(function ProductsList({ products }: Props) {
		getPhotoAccessKey();

		return (
			<>
				{products.map((product, index) => {
					return (
						<ProductRow
							key={index}
							product={product}
							photoAccessKey={photoAccessKey}
						/>
					);
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

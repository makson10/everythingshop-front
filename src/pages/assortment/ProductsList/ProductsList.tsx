import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductType } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	products: ProductType;
}

export function ProductsList({ products }: Props) {
	const [photoAccessKey, setPhotoAccessKey] = useState<string>('');

	useEffect(() => {
		const getPhotoAccessKey = async () => {
			const photoAccessKey = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
				)
				.then((res) => res.data.token);

			setPhotoAccessKey(photoAccessKey);
		};

		getPhotoAccessKey();
	}, [products]);

	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
			<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{products.map((product, index) => (
					<ProductCard
						key={index}
						product={product}
						photoAccessKey={photoAccessKey}
					/>
				))}
			</div>
		</div>
	);
}

import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/productTypes';

interface Props {
	productData: IProduct;
}

export default function MainProductInfo({ productData }: Props) {
	const defaultProductPhoto =
		'https://img.icons8.com/ios/50/000000/product--v1.png';

	return (
		<div className="flex gap-x-4 w-1/4">
			<Image
				className={'h-12 w-12 flex-none object-cover rounded-full bg-gray-50'}
				src={productData.photoIds[0] || defaultProductPhoto}
				alt="#"
				width={100}
				height={100}
				loading="lazy"
			/>

			<div className="min-w-0 flex-auto">
				<Link
					href={`/assortment/${productData._id}`}
					className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:underline">
					{productData.title}
				</Link>
				<p className="mt-1 truncate text-xs leading-5 text-gray-500">
					{productData.creator}
				</p>
			</div>
		</div>
	);
}

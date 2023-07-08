import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	productData: IProduct;
}

export default function MainProductInfo({ productData }: Props) {
	const [productPhoto, setProductPhoto] = useState(
		'https://img.icons8.com/ios/50/000000/product--v1.png'
	);

	useEffect(() => {
		const getPhotoAccessKey = async () => {
			const key = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
				)
				.then((res) => res.data.token);

			return key;
		};

		const getPhotoObjectURL = async () => {
			const photoAccessKey = await getPhotoAccessKey();

			const photoFile = await axios
				.get(
					`https://www.googleapis.com/drive/v3/files/${productData.photo_id[0]}?alt=media`,
					{
						headers: {
							Authorization: 'Bearer ' + photoAccessKey,
						},
						responseType: 'blob',
					}
				)
				.then((res) => res.data);

			const imageObjectUrl = URL.createObjectURL(photoFile);
			setProductPhoto(imageObjectUrl);
		};

		getPhotoObjectURL();
	}, []);

	return (
		<div className="flex gap-x-4">
			<Image
				className={'h-12 w-12 flex-none object-cover rounded-full bg-gray-50'}
				src={productPhoto}
				alt="#"
				width={100}
				height={100}
				loading="lazy"
			/>
			<div className="min-w-0 flex-auto">
				<Link
					href={`/assortment/${productData.uniqueProductId}`}
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

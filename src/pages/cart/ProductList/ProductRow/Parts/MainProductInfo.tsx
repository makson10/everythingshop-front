import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUpdateCartContext } from '@/hooks/useCartContext';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	productData: IProduct;
	photoAccessKey: string;
}

export default function MainProductInfo({
	productData,
	photoAccessKey,
}: Props) {
	const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
	const { addPhotoToProduct } = useUpdateCartContext();
	const defaultProductPhoto =
		'https://img.icons8.com/ios/50/000000/product--v1.png';

	const getPhotoFile = async (photoId: string) => {
		const file = await axios
			.get(`https://www.googleapis.com/drive/v3/files/${photoId}?alt=media`, {
				headers: {
					Authorization: 'Bearer ' + photoAccessKey,
				},
				responseType: 'blob',
			})
			.then((res) => res.data);

		return file;
	};

	const getPhotoObjectURL = useCallback(async () => {
		if (!photoAccessKey) return;

		setIsPhotoLoading(true);

		const photoFile = await getPhotoFile(productData.photoIds[0]);
		const imageObjectUrl = URL.createObjectURL(photoFile);
		addPhotoToProduct(productData.uniqueProductId, imageObjectUrl);

		setIsPhotoLoading(false);
	}, [productData.photoIds, photoAccessKey]);

	useEffect(() => {
		getPhotoObjectURL();
	}, [getPhotoObjectURL]);

	return (
		<div className="flex gap-x-4">
			{isPhotoLoading ? (
				<div className="w-[48px] h-[48px] scale-50 flex flex-col justify-center items-center">
					<LoadingSpinner />
				</div>
			) : (
				<Image
					className={'h-12 w-12 flex-none object-cover rounded-full bg-gray-50'}
					src={productData.imageObjectUrl || defaultProductPhoto}
					alt="#"
					width={100}
					height={100}
					loading="lazy"
				/>
			)}
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

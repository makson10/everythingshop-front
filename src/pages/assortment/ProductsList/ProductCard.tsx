import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	product: IProduct;
	photoAccessKey: string;
}

export function ProductCard({ product, photoAccessKey }: Props) {
	const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
	const [productPhoto, setProductPhoto] = useState(
		`https://img.icons8.com/ios/250/808080/product--v1.png`
	);
	const router = useRouter();

	const handleGoToProductPage = () => {
		router.push(`/assortment/${product.uniqueProductId}`);
	};

	useEffect(() => {
		if (!photoAccessKey) return;

		const getProductPhoto = async () => {
			setIsPhotoLoading(true);

			const photoFile = await axios
				.get(
					`https://www.googleapis.com/drive/v3/files/${product.photoIds[0]}?alt=media`,
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

			setIsPhotoLoading(false);
		};

		getProductPhoto();
	}, [product.photoIds, photoAccessKey]);

	return (
		<div className="group relative">
			<div className="flex flex-col justify-center items-center min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
				{isPhotoLoading ? (
					<LoadingSpinner />
				) : (
					<Image
						className="h-full w-full object-contain object-center lg:h-full lg:w-full"
						src={productPhoto}
						alt="#"
						crossOrigin="use-credentials"
						width={1000}
						height={1000}
						onClick={handleGoToProductPage}
						loading="lazy"
					/>
				)}
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700 dark:text-white">
						<Link href={`/assortment/${product.uniqueProductId}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{product.title}
						</Link>
					</h3>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Seller: {product.creator}
					</p>
				</div>
				<p className="text-sm font-medium text-gray-900 dark:text-white">
					${product.price}
				</p>
			</div>
		</div>
	);
}

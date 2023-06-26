import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/productTypes';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';
import axios from 'axios';

interface Props {
	productData: IProduct;
}

export function ProductCard({ productData }: Props) {
	const isDarkTheme = useIsDarkTheme();
	const [productPhoto, setProductPhoto] = useState(
		`https://img.icons8.com/ios/250/808080/product--v1.png`
	);
	const router = useRouter();

	const handleGoToProductPage = () => {
		router.push(`/assortment/${productData.uniqueProductId}`);
	};

	useEffect(() => {
		(async () => {
			const dropboxToken = await axios
				.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/getDropboxToken`)
				.then((res) => res.data);

			const res = await axios.get(
				`https://content.dropboxapi.com/2/files/download`,
				{
					headers: {
						Authorization: `Bearer ${dropboxToken}`,
						'Dropbox-API-Arg': JSON.stringify({
							path: '/' + productData.photo_id[0],
						}),
					},
					responseType: 'blob',
				}
			);

			const imageObjectUrl = URL.createObjectURL(res.data);
			setProductPhoto(imageObjectUrl);
		})();
	}, []);

	return (
		<div className="group relative">
			<div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
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
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700 dark:text-white">
						<Link href={`/assortment/${productData.uniqueProductId}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{productData.title}
						</Link>
					</h3>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Seller: {productData.creator}
					</p>
				</div>
				<p className="text-sm font-medium text-gray-900 dark:text-white">
					${productData.price}
				</p>
			</div>
		</div>
	);
}

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ICartProduct } from '@/types/productTypes';
import { useCartUpdateContext } from '@/hooks/useCartContext';
import axios from 'axios';

interface Props {
	product: ICartProduct;
}

export default function ProductRow({ product }: Props) {
	const [productPhoto, setProductPhoto] = useState(
		'https://img.icons8.com/ios/50/000000/product--v1.png'
	);
	const [isPhotoChanges, setIsPhotoChanges] = useState<boolean>(false);
	const { deleteProduct, decreaseProductAmount, increaseProductAmount } =
		useCartUpdateContext();

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
							path: `/${product.productsData.uniqueProductId}.png`,
						}),
					},
					responseType: 'blob',
				}
			);

			const imageObjectUrl = URL.createObjectURL(res.data);
			setProductPhoto(imageObjectUrl);
			setIsPhotoChanges(true);
		})();
	}, []);

	return (
		<li className="flex justify-between gap-x-6 py-5 max-sm:justify-center">
			<div className="flex gap-x-4">
				<Image
					className={`h-12 w-12 flex-none rounded-full ${
						isPhotoChanges ? '' : 'p-2'
					} bg-gray-50`}
					src={productPhoto}
					alt="#"
					width={100}
					height={100}
					loading="lazy"
				/>
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						{product.productsData.title}
					</p>
					<p className="mt-1 truncate text-xs leading-5 text-gray-500">
						{product.productsData.creator}
					</p>
				</div>
			</div>
			<div>
				<button
					onClick={() =>
						decreaseProductAmount(product.productsData.uniqueProductId)
					}
					disabled={product.amount === 1}
					className="relative bg-white min-w-[38px] inline-flex justify-center items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:bg-gray-200">
					-
				</button>
				<div className="relative min-w-[38px] inline-flex justify-center items-center px-2 py-2 text-mg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-white text-black ring-1 ring-inset ring-gray-300">
					{product.amount}
				</div>
				<button
					onClick={() =>
						increaseProductAmount(product.productsData.uniqueProductId)
					}
					disabled={product.amount === 99}
					className="relative bg-white min-w-[38px] inline-flex justify-center items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:bg-gray-200">
					+
				</button>
			</div>
			<div className="flex flex-col items-end max-sm:justify-center">
				<p className="text-sm leading-6 text-gray-900 dark:text-white max-sm:text-center">
					${product.productsData.price}
				</p>
				<div className="flex">
					<button
						onClick={() => deleteProduct(product.productsData.uniqueProductId)}
						type="button"
						className="font-medium text-indigo-600 hover:text-indigo-500">
						Remove
					</button>
				</div>
			</div>
		</li>
	);
}

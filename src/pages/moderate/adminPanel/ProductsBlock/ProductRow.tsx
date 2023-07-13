import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	product: IProduct;
}

export default function ProductRow({ product }: Props) {
	const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
	const [productPhoto, setProductPhoto] = useState(
		'https://img.icons8.com/ios/50/000000/product--v1.png'
	);
	const router = useRouter();

	const handleDeleteProduct = async () => {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/deleteProduct/${product.uniqueProductId}`
		);

		router.reload();
	};

	useEffect(() => {
		const getProductPhoto = async () => {
			setIsPhotoLoading(true);

			const photoAccessKey = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
				)
				.then((res) => res.data.token);

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
	}, []);

	return (
		<div className="flex flex-row border-b-[2px] border-[gray] p-2">
			<div className="flex flex-row items-center gap-[10px]">
				{isPhotoLoading ? (
					<div className="w-[50px] h-[50px] flex flex-col justify-center items-center">
						<div className="scale-50">
							<LoadingSpinner />
						</div>
					</div>
				) : (
					<Image
						className="w-[50px] h-[50px] rounded object-cover"
						src={productPhoto}
						alt="#"
						width={100}
						height={100}
					/>
				)}
				<p>
					<Link
						className="text-black hover:underline"
						href={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/assortment/${product.uniqueProductId}`}>
						<b>{product.title}</b>
					</Link>
					, {product.creator}
				</p>
			</div>
			<div className="flex flex-row items-center gap-[5px] ml-auto">
				<p className="max-sm:text-[0.9rem]">${product.price}</p>
				<button
					className="transparent border-none"
					onClick={handleDeleteProduct}>
					<Image
						className="min-w-[30px]"
						src="https://img.icons8.com/windows/100/null/trash.png"
						alt="#"
						width={30}
						height={30}
					/>
				</button>
			</div>
		</div>
	);
}

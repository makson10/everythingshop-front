import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import axios from 'axios';

interface Props {
	photoId: string;
	photoAccessKey: string;
}

export default function RowPhoto({ photoId, photoAccessKey }: Props) {
	const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
	const [productPhoto, setProductPhoto] = useState(
		'https://img.icons8.com/ios/50/000000/product--v1.png'
	);

	const getProductPhoto = useCallback(async () => {
		if (!photoAccessKey) return;
		setIsPhotoLoading(true);

		const response = await fetch(
			`https://www.googleapis.com/drive/v3/files/${photoId}?alt=media`,
			{
				headers: {
					Authorization: 'Bearer ' + photoAccessKey,
				},
				cache: 'force-cache',
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch product photo');
		}

		const photoFile = await response.blob();
		const imageObjectUrl = URL.createObjectURL(photoFile);
		setProductPhoto(imageObjectUrl);

		setIsPhotoLoading(false);
	}, [photoId, photoAccessKey]);

	useEffect(() => {
		getProductPhoto();
	}, [getProductPhoto]);

	return (
		<>
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
		</>
	);
}

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface Props {
	productPhotoId: string;
}

export default function Photo({ productPhotoId }: Props) {
	const [productPhoto, setProductPhoto] = useState(
		'https://img.icons8.com/ios/250/000000/product--v1.png'
	);

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
							path: `/${productPhotoId}.png`,
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
		<>
			{/* Image gallery */}
			<div className="mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:block">
					<Image
						className="h-full w-full object-contain object-center"
						src={productPhoto}
						alt="#"
						width={1000}
						height={1000}
						onError={(event) => {
							event.currentTarget.src =
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
							event.currentTarget.onerror = null;
						}}
						loading="lazy"
					/>
				</div>
			</div>
		</>
	);
}

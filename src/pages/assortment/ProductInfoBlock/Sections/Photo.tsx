import Image from 'next/image';

interface Props {
	productPhotoId: string;
}

export default function Photo({ productPhotoId }: Props) {
	return (
		<>
			{/* Image gallery */}
			<div className="mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:block">
					<Image
						className="h-full w-full object-contain object-center"
						src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${productPhotoId}`}
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

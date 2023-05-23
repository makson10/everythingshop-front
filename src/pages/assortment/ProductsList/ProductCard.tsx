import { IProduct } from '@/types/productTypes';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
	productData: IProduct;
}

export function ProductCard({ productData }: Props) {
	const router = useRouter();

	const handleGoToProductPage = () => {
		router.push(`/assortment/${productData.uniqueProductId}`);
	};

	return (
		<div className="group relative">
			<div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
				<img
					src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${productData.photo_id}`}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
					onClick={handleGoToProductPage}
					onError={(event) => {
						event.currentTarget.src =
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
						event.currentTarget.onerror = null;
					}}
					loading="lazy"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700">
						<Link href={`/assortment/${productData.uniqueProductId}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{productData.title}
						</Link>
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Seller: {productData.creator}
					</p>
				</div>
				<p className="text-sm font-medium text-gray-900">
					${productData.price}
				</p>
			</div>
		</div>
	);
}

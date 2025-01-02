import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/productTypes';

interface Props {
	product: IProduct;
}

export function ProductCard({ product }: Props) {
	const router = useRouter();

	const handleGoToProductPage = () => {
		router.push(`/assortment/${product._id}`);
	};

	return (
		<div className="group relative">
			<div className="flex flex-col justify-center items-center min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
				<Image
					className="h-full w-full object-contain object-center lg:h-full lg:w-full"
					src={product.photoIds[0]}
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
						<Link href={`/assortment/${product._id}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							<p>{product.title}</p>
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

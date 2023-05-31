import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	product: IProduct;
}

export default function ProductRow({ product }: Props) {
	const router = useRouter();

	const handleClick = async () => {
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`);
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/deleteProduct/${product.uniqueProductId}`
		);

		router.reload();
	};

	return (
		<div className="flex flex-row border-b-[2px] border-[gray] p-2">
			<div className="flex flex-row items-center gap-[10px]">
				<Image
					className="w-[50px] h-[50px]"
					src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${product.photo_id}`}
					alt="#"
					width={100}
					height={100}
				/>
				<p>
					<Link
						className="text-black hover:underline"
						href={`http://localhost:3000/assortment/${product.uniqueProductId}`}>
						<b>{product.title}</b>
					</Link>
					, {product.creator}
				</p>
			</div>
			<div className="flex flex-row items-center gap-[5px] ml-auto">
				<p className="max-sm:text-[0.9rem]">${product.price}</p>
				<button className="transparent border-none" onClick={handleClick}>
					<Image
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

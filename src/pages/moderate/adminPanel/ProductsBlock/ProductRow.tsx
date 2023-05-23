import { IProduct } from '@/types/productTypes';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

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
				<img
					className="w-[50px] h-[50px]"
					src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${product.photo_id}`}
					onError={(event) => {
						event.currentTarget.src =
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
						event.currentTarget.onerror = null;
					}}
					loading="lazy"
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
					<img
						className="max-w-[30px]"
						src="https://img.icons8.com/windows/30/null/trash.png"
					/>
				</button>
			</div>
		</div>
	);
}

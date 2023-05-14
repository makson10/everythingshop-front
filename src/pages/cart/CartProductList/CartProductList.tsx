import { useEffect, useState } from 'react';
import {
	useCartContext,
	useCartUpdateContext,
} from '@/pages/context/CartContext';
import { useUserData } from '@/pages/context/UserDataContext';
import { FailWindow } from '../FailWindow/FailWindow';
import { SubmitBuyRow } from './SubmitBuyRow';

export function CartProductList() {
	const { deleteProduct } = useCartUpdateContext();
	const authorizedUser = useUserData();
	const products = useCartContext();
	const [allProductsCostAmount, setAllProductsCostAmount] = useState<number>(0);

	useEffect(() => {
		let sum: number = 0;
		products.map((product) => {
			if (product.price) {
				sum += +product.price;
			}
		});

		setAllProductsCostAmount(sum);
	}, [products]);

	if (!authorizedUser.data?.name) {
		return (
			<FailWindow failMessage="Cart is not available for unauthorized users" />
		);
	}

	if (!products || products.length === 0) {
		return <FailWindow failMessage="There are no products in cart" />;
	}

	return (
		<div className="flex flex-col justify-center items-center gap-8 min-w-full">
			<div className="w-1/2">
				<ul role="list" className="divide-y divide-gray-100">
					{products.map((product) => (
						<li
							key={product.price}
							className="flex justify-between gap-x-6 py-5">
							<div className="flex gap-x-4">
								<img
									className="h-12 w-12 flex-none rounded-full bg-gray-50"
									src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${product.photo_id}`}
									onError={(event) => {
										event.currentTarget.src =
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
										event.currentTarget.onerror = null;
									}}
									loading="lazy"
								/>
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										{product.title}
									</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-500">
										{product.creator}
									</p>
								</div>
							</div>
							<div className="hidden sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">
									${product.price}
								</p>
								<div className="flex">
									<button
										onClick={() => deleteProduct(product.uniqueProductId)}
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500">
										Remove
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<SubmitBuyRow costSum={allProductsCostAmount} />
		</div>
	);
}

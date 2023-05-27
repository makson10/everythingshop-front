import { useEffect, useState } from 'react';
import { useCartContext, useCartUpdateContext } from '@/hooks/useCartContext';
import { useUserData } from '@/hooks/useUserDataContext';
import { FailWindow } from '../FailWindow/FailWindow';
import { SubmitBuyRow } from './SubmitBuyRow';

export function CartProductList() {
	const { deleteProduct, decreaseProductAmount, increaseProductAmount } =
		useCartUpdateContext();
	const authorizedUser = useUserData();
	const products = useCartContext();
	const [costSum, setCostSum] = useState<number>(0);

	useEffect(() => {
		let sum: number = 0;

		products.map((product) => {
			if (product.productsData.price) {
				sum += product.productsData.price * product.amount;
			}
		});

		setCostSum(sum);
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
			<div className="w-1/2 max-sm:w-full">
				<ul role="list" className="divide-y divide-gray-100">
					{products.map((product, index) => (
						<li
							key={index}
							className="flex justify-between gap-x-6 py-5 max-sm:justify-center">
							<div className="flex gap-x-4">
								<img
									className="h-12 w-12 flex-none rounded-full bg-gray-50"
									src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/image/${product.productsData.photo_id}`}
									onError={(event) => {
										event.currentTarget.src =
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2vEKNv6zaKu2i_NKvQXN8lYd0g2NMeNXzrkrZlw&s';
										event.currentTarget.onerror = null;
									}}
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
										onClick={() =>
											deleteProduct(product.productsData.uniqueProductId)
										}
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
			<SubmitBuyRow costSum={costSum} />
		</div>
	);
}

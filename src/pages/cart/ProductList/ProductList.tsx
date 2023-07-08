import { useEffect, useState } from 'react';
import { useCartContext, useUpdateCartContext } from '@/hooks/useCartContext';
import { useUserData } from '@/hooks/useUserDataContext';
import { FailWindow } from '@/components/FailWindow/FailWindow';
import ProductRow from './ProductRow/ProductRow';
import TotalPriceSection from './TotalPriceSection';
import axios from 'axios';

export default function ProductList() {
	const authorizedUser = useUserData();
	const products = useCartContext();
	const { deleteProduct } = useUpdateCartContext();
	const [purchaseTotalPrice, setPurchaseTotalPrice] = useState<number>(0);

	useEffect(() => {
		let sum = 0;

		products.map(async (product) => {
			const doesProductExist = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/doesProductExist/${product.productsData.uniqueProductId}`
				)
				.then((res) => res.data);

			if (!doesProductExist) {
				deleteProduct(product.productsData.uniqueProductId);
				return;
			}

			sum += product.amount * product.productsData.price;
			setPurchaseTotalPrice(sum);
		});
	}, [products]);

	if (!authorizedUser.data?.email) {
		return (
			<FailWindow failMessage="Cart is not available for unauthorized users" />
		);
	}

	if (!products || products.length === 0) {
		return <FailWindow failMessage="There are no products in cart" />;
	}

	return (
		<div className="flex-[2_1_auto] flex justify-center items-center p-4">
			<div className="flex flex-col justify-center items-center gap-8 min-w-full">
				<div className="w-1/2 max-sm:w-full">
					<ul role="list" className="divide-y divide-gray-100">
						{products.map((product, index) => {
							return (
								<li
									key={index}
									className="flex justify-between gap-x-6 py-5 max-sm:justify-center">
									<ProductRow product={product} />
								</li>
							);
						})}
					</ul>
				</div>
				<TotalPriceSection purchaseTotalPrice={purchaseTotalPrice} />
			</div>
		</div>
	);
}

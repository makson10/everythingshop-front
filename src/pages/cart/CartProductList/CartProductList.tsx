import { useEffect, useState } from 'react';
import { useCartContext, useUpdateCartContext } from '@/hooks/useCartContext';
import { useUserData } from '@/hooks/useUserDataContext';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { SubmitBuyRow } from './SubmitBuyRow';
import { FailWindow } from '../FailWindow/FailWindow';
import ProductRow from './ProductRow/ProductRow';
import axios from 'axios';

export function CartProductList() {
	const { deleteProduct } = useUpdateCartContext();
	const authorizedUser = useUserData();
	const products = useCartContext();
	const [costSum, setCostSum] = useState<number>(0);

	useEffect(() => {
		let sum: number = 0;

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

			if (product.productsData.price) {
				sum += product.productsData.price * product.amount;
				setCostSum(sum);
			}
		});
	}, [products]);

	if (authorizedUser.isLoading) {
		return <ShowLoadingScreen />;
	}

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
						<ProductRow product={product} key={index} />
					))}
				</ul>
			</div>
			<SubmitBuyRow costSum={costSum} />
		</div>
	);
}

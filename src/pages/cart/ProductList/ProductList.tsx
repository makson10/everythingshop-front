import { useEffect, useState } from 'react';
import { useCartContext, useUpdateCartContext } from '@/hooks/useCartContext';
import { FailWindow } from '@/components/FailWindow/FailWindow';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import { useUserData } from '@/hooks/useUserDataContext';
import ProductRow from './ProductRow/ProductRow';
import TotalPriceSection from './TotalPriceSection';
import axios from 'axios';

export default function ProductList() {
	const authorizedUser = useUserData();
	const products = useCartContext();
	const { deleteProduct } = useUpdateCartContext();
	const [purchaseTotalPrice, setPurchaseTotalPrice] = useState<number>(0);
	const [readyToShowList, setReadyToShowList] = useState<boolean>(false);

	const calculateTotalPrice = async () => {
		const totalPrice = products.reduce(
			(accumulator, currentValue) =>
				accumulator + currentValue.amount * currentValue.productsData.price,
			0
		);

		return totalPrice;
	};

	const deleteUnexistingProductsFromCart = async () => {
		const getPhotoFunctionsPromises = products.map(async (product) => {
			const doesProductExist = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/doesProductExist/${product.productsData.uniqueProductId}`
				)
				.then((res) => res.data);

			if (!doesProductExist) {
				deleteProduct(product.productsData.uniqueProductId);
			}
		});

		await Promise.all(getPhotoFunctionsPromises);
	};

	useEffect(() => {
		const prepareProductDataToShow = async () => {
			await Promise.all([
				deleteUnexistingProductsFromCart(),
				setPurchaseTotalPrice(await calculateTotalPrice()),
			]);

			setTimeout(() => {
				setReadyToShowList(true);
			}, 500);
		};

		prepareProductDataToShow();
	}, [products]);

	if (!authorizedUser.data?.email) return <UserNotLoginWindow />;

	if (!products || products.length === 0) {
		return <FailWindow failMessage="There are no products in cart" />;
	}

	return (
		<div className="flex-[2_1_auto] flex justify-center items-center p-4">
			<div className="flex flex-col justify-center items-center gap-8 min-w-full">
				<div className="w-1/2 max-sm:w-full">
					<div role="list" className="divide-y divide-gray-100">
						{readyToShowList ? (
							<>
								{products.map((product, index) => {
									return (
										<div
											key={index}
											className="flex justify-between gap-x-6 py-5 max-sm:justify-center max-sm:gap-x-2">
											<ProductRow product={product} />
										</div>
									);
								})}
							</>
						) : (
							<ShowLoadingScreen />
						)}
					</div>
				</div>
				{purchaseTotalPrice && (
					<TotalPriceSection purchaseTotalPrice={purchaseTotalPrice} />
				)}
			</div>
		</div>
	);
}

import MainProductInfo from './Parts/MainProductInfo';
import AmountRegulator from './Parts/AmountRegulator';
import PriceTag from './Parts/PriceTag';
import RemoveButton from './Parts/RemoveButton';
import { ICartProduct } from '@/types/contextTypes';
import { useAppDispatch } from '@/store/hooks';
import { deleteProduct } from '@/store/cart/cartSlice';

interface Props {
	product: ICartProduct;
}

export default function ProductRow({ product }: Props) {
	const dispatch = useAppDispatch();

	const handleDeleteThisProduct = () => {
		dispatch(deleteProduct(product.productsData.uniqueProductId));
	};

	return (
		<div className="flex justify-between gap-x-6 py-5 max-sm:justify-center max-sm:gap-x-2">
			<MainProductInfo
				productData={product.productsData}
			/>
			<AmountRegulator
				productId={product.productsData.uniqueProductId}
				productAmount={product.amount}
			/>
			<div className="flex flex-col items-end max-sm:justify-center">
				<PriceTag price={product.productsData.price} />
				<RemoveButton handleDeleteThisProduct={handleDeleteThisProduct} />
			</div>
		</div>
	);
}

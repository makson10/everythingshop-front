import { Dispatch, SetStateAction } from 'react';
import { useUpdateCartContext } from '@/hooks/useCartContext';
import MainProductInfo from './Parts/MainProductInfo';
import AmountRegulator from './Parts/AmountRegulator';
import PriceTag from './Parts/PriceTag';
import RemoveButton from './Parts/RemoveButton';
import { ICartProduct } from '@/types/contextTypes';

interface Props {
	product: ICartProduct;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ProductRow({ product, setIsLoading }: Props) {
	const { deleteProduct } = useUpdateCartContext();

	const handleDeleteThisProduct = () => {
		deleteProduct(product.productsData.uniqueProductId);
	};

	return (
		<>
			<MainProductInfo
				productData={product.productsData}
				setIsLoading={setIsLoading}
			/>
			<AmountRegulator
				productId={product.productsData.uniqueProductId}
				productAmount={product.amount}
			/>
			<div className="flex flex-col items-end max-sm:justify-center">
				<PriceTag price={product.productsData.price} />
				<RemoveButton handleDeleteThisProduct={handleDeleteThisProduct} />
			</div>
		</>
	);
}

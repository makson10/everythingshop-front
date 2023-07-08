import { useUpdateCartContext } from '@/hooks/useCartContext';
import { ICartProduct } from '@/types/contextTypes';
import MainProductInfo from './Parts/MainProductInfo';
import AmountRegulator from './Parts/AmountRegulator';
import RemoveButton from './Parts/RemoveButton';
import PriceTag from './Parts/PriceTag';

interface Props {
	product: ICartProduct;
}

export default function ProductRow({ product }: Props) {
	const { deleteProduct } = useUpdateCartContext();

	const handleDeleteThisProduct = () => {
		deleteProduct(product.productsData.uniqueProductId);
	};

	return (
		<>
			<MainProductInfo productData={product.productsData} />
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

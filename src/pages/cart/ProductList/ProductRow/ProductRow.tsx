import { useUpdateCartContext } from '@/hooks/useCartContext';
import MainProductInfo from './Parts/MainProductInfo';
import AmountRegulator from './Parts/AmountRegulator';
import PriceTag from './Parts/PriceTag';
import RemoveButton from './Parts/RemoveButton';
import { ICartProduct } from '@/types/contextTypes';

interface Props {
	product: ICartProduct;
	photoAccessKey: string;
}

export default function ProductRow({ product, photoAccessKey }: Props) {
	const { deleteProduct } = useUpdateCartContext();

	const handleDeleteThisProduct = () => {
		deleteProduct(product.productsData.uniqueProductId);
	};

	return (
		<div className="flex justify-between gap-x-6 py-5 max-sm:justify-center max-sm:gap-x-2">
			<MainProductInfo
				productData={product.productsData}
				photoAccessKey={photoAccessKey}
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

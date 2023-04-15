import { useCartContext } from '@/pages/context/CartContext';
import { useUserData } from '@/pages/context/UserDataContext';
import { FailWindow } from '../FailWindow/FailWindow';
import { ProductRow } from './ProductRow/ProductRow';
import { IProductData } from '@/pages/types/contextTypes';
import styles from './Content.module.scss';

export function Content() {
	const authorizedUser = useUserData();
	const products = useCartContext();

	if (!authorizedUser.data?.login || !authorizedUser.data.password) {
		return (
			<FailWindow failMessage="Cart is not available for unauthorized users" />
		);
	}

	if (!products || products.length === 0) {
		return <FailWindow failMessage="There are no products in cart" />;
	}

	return (
		<div id={styles['cart-content']}>
			<div id={styles['products-list']}>
				{products.map((product: IProductData, index: number) => {
					return <ProductRow key={index} productData={product} />;
				})}
			</div>
		</div>
	);
}

import Header from '@/components/Header/Header';
import ProductList from './ProductList/ProductList';

export default function Cart() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header pageName="Cart" showCartIcon={false} />
			<ProductList />
		</div>
	);
}

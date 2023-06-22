import Header from '@/components/Header/Header';
import { CartProductList } from './CartProductList/CartProductList';

export default function index() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header pageName={'Cart'} showCartIcon={false} />
			<div className="flex-[2_1_auto] flex justify-center items-center p-4">
				<CartProductList />
			</div>
		</div>
	);
}

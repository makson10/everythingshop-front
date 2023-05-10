import Header from '@/pages/components/Header/Header';
import { CartProductList } from './CartProductList/CartProductList';

export default function index() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header pageName={'Card'} showCartIcon={false} />
			<div className="flex-[2_1_auto] flex justify-center items-center p-4">
				<CartProductList />
			</div>
		</div>
	);
}

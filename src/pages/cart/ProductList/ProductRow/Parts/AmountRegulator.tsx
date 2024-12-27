import {
	decreaseProductAmount,
	increaseProductAmount,
} from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

interface Props {
	productId: string;
	productAmount: number;
}

export default function AmountRegulator({ productId, productAmount }: Props) {
	const dispatch = useAppDispatch();

	return (
		<div className="my-auto">
			<button
				onClick={() => dispatch(decreaseProductAmount(productId))}
				disabled={productAmount === 1}
				className="relative bg-white min-w-[38px] inline-flex justify-center items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:bg-gray-200 max-sm:min-w-[26px]">
				-
			</button>
			<div className="relative min-w-[38px] inline-flex justify-center items-center px-2 py-2 text-mg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-white text-black ring-1 ring-inset ring-gray-300 max-sm:min-w-[22px]">
				{productAmount}
			</div>
			<button
				onClick={() => dispatch(increaseProductAmount(productId))}
				disabled={productAmount === 99}
				className="relative bg-white min-w-[38px] inline-flex justify-center items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:bg-gray-200 max-sm:min-w-[26px]">
				+
			</button>
		</div>
	);
}

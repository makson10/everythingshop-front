import { useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CartButton = () => {
	const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
	const cart = useAppSelector((state) => state.cart);
	const [cartProducstAmount, setCartProducstAmount] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		const newValue = cart.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);

		setCartProducstAmount(newValue);
	}, [cart]);

	return (
		<button
			className="relative w-fit h-fit max-sm:w-[32px] max-sm:h-[32px]"
			id="cart-button"
			onClick={() => router.push('/cart')}>
			<Image
				src={`https://img.icons8.com/metro/100/${
					isDarkTheme ? 'ffffff' : '000000'
				}/shopping-cart.png`}
				alt="#"
				width={48}
				height={48}
			/>
			{cartProducstAmount !== 0 && (
				<div className="flex justify-center items-center absolute top-[-20%] left-[65%] w-1/2 bg-[coral] rounded-full max-sm:text-[0.8rem] max-sm:h-1/2 max-sm:top-[-15%]">
					<p>{cartProducstAmount}</p>
				</div>
			)}
		</button>
	);
};

export default CartButton;

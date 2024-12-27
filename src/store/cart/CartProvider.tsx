import { PropsWithChildren, useEffect, useRef } from 'react';
import { useAppDispatch } from '../hooks';
import { setProduct } from './cartSlice';

const CartProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const existCart = JSON.parse(localStorage.getItem('cart') ?? 'null');

		if (!existCart) {
			dispatch(setProduct([]));
			localStorage.setItem('cart', '[]');
			return;
		}

		dispatch(setProduct(existCart));
	}, []);

	return <>{children}</>;
};

export default CartProvider;

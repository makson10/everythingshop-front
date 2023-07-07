import { useContext } from 'react';
import { CartContext, UpdateCartContext } from '@/context/CartContext';

export function useCartContext() {
	return useContext(CartContext);
}

export function useUpdateCartContext() {
	return useContext(UpdateCartContext);
}

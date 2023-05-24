import { useContext } from 'react';
import { CartContext, CartUpdateContext } from '@/context/CartContext';

export function useCartContext() {
	return useContext(CartContext);
}

export function useCartUpdateContext() {
	return useContext(CartUpdateContext);
}

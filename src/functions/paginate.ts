import { ProductType } from '@/types/productTypes';

export const paginate = (
	products: ProductType,
	pageAmount: number,
	showingProductAmount: number
) => {
	const startIndex = (pageAmount - 1) * showingProductAmount;
	const endIndex = startIndex + showingProductAmount;
	return products.slice(startIndex, endIndex);
};

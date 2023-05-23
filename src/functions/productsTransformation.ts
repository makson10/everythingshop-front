import { IProduct, ProductType } from '@/types/productTypes';

export const filterProducts = (
	filterAction: string,
	arrayForFilter: ProductType
) => {
	let filterFunction = (product: IProduct) => {
		return true;
	};

	switch (filterAction) {
		case 'cheaperThan1000':
			filterFunction = (product: IProduct) => {
				return product.price < 1000;
			};
			break;

		case 'moreExpensiveThan1000':
			filterFunction = (product: IProduct) => {
				return product.price > 1000;
			};
			break;

		case 'cheaperThan5000':
			filterFunction = (product: IProduct) => {
				return product.price < 5000;
			};
			break;

		case 'moreExpensiveThan5000':
			filterFunction = (product: IProduct) => {
				return product.price > 5000;
			};
			break;

		default:
			break;
	}

	const filteredProducts: ProductType = arrayForFilter.filter(filterFunction);
	return filteredProducts;
};

export const sortProducts = (sortAction: string, arrayForSort: ProductType) => {
	let sortFunction = (a: IProduct, b: IProduct) => a.price - b.price;

	switch (sortAction) {
		case 'aFirst':
			sortFunction = (a: IProduct, b: IProduct) =>
				a.title.localeCompare(b.title);
			break;

		case 'zFirst':
			sortFunction = (a: IProduct, b: IProduct) =>
				b.title.localeCompare(a.title);
			break;

		case 'cheapFirst':
			sortFunction = (a: IProduct, b: IProduct) => {
				return a.price - b.price;
			};
			break;

		case 'expensiveFirst':
			sortFunction = (a: IProduct, b: IProduct) => {
				return b.price - a.price;
			};
			break;

		default:
			break;
	}

	const sortedProducts: ProductType = arrayForSort.sort(sortFunction);
	return sortedProducts;
};

export const searchProducts = (
	searchName: string,
	arrayForSearch: ProductType
) => {
	const newArray: ProductType = [];

	arrayForSearch.map((product) => {
		const productTitle = product.title.toLowerCase();
		const productTitleStart = productTitle.slice(0, searchName.length);
		searchName = searchName.toLowerCase();

		if (productTitleStart === searchName) newArray.push(product);
	});

	return newArray;
};

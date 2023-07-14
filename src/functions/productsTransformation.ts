import { IProduct, ProductType } from '@/types/productTypes';

const filterProducts = (filterAction: string, dataForFilter: ProductType) => {
	let filterFunction = (product: IProduct) => true;

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

	const filteredProducts = dataForFilter.filter(filterFunction);
	return filteredProducts;
};

const sortProducts = (sortAction: string, dataForSort: ProductType) => {
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

	const sortedProducts = dataForSort.sort(sortFunction);
	return sortedProducts;
};

const searchProducts = (searchName: string, dataForSearch: ProductType) => {
	const newArray: ProductType = [];
	searchName = searchName.toLowerCase();

	dataForSearch.map((product) => {
		const productTitle = product.title.toLowerCase();
		const productTitleStart = productTitle.slice(0, searchName.length);

		if (productTitleStart === searchName) newArray.push(product);
	});

	return newArray;
};

export { filterProducts, sortProducts, searchProducts };

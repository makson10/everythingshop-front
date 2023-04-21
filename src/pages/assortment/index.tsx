import { GetServerSideProps } from 'next';
import Header from '../components/Header/Header';
import { ProductsList } from './ProductsList/ProductsList';
import { PaginationBar } from './PaginationBar/PaginationBar';
import { useEffect, useState } from 'react';
import { paginate } from './PaginationBar/paginate';
import FilterBar from './FilterBar/FilterBar';
import { ISortAndFilterParameters } from '../types/sortAndFilterParameters';
import { IProduct } from '@/pages/types/productTypes';
import { ProductType } from '@/pages/types/productTypes';
import {
	filterProducts,
	sortProducts,
} from '../functions/productsTransformation';

interface FetchedDataType {
	productsData: ProductType;
}

export default function Assortment({ productsData }: FetchedDataType) {
	const [products, setProducts] = useState<ProductType>(productsData);
	const [productListParameters, setProductListParameters] =
		useState<ISortAndFilterParameters>({ filter: '', sort: '' });

	const [currentPage, setCurrentPage] = useState<number>(1);
	const showingProductAmount = 15;

	const productsForDisplay = paginate(
		products,
		currentPage,
		showingProductAmount
	);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		if (
			productListParameters.sort === '' &&
			productListParameters.filter === ''
		) {
			return;
		}

		const filteredProducts = filterProducts(
			productListParameters.filter,
			productsData
		);

		const sortedProducts = sortProducts(
			productListParameters.sort,
			filteredProducts
		);

		console.log(sortedProducts);
        setProducts(sortedProducts);
	}, [productListParameters]);

	return (
		<>
			<Header pageName={'Assortment'} />
			<FilterBar setParameters={setProductListParameters} />
			<ProductsList products={productsForDisplay} />
			<PaginationBar
				onPageChange={onPageChange}
				productsAmount={products.length}
				currentPage={currentPage}
				showingProductAmount={showingProductAmount}
			/>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	FetchedDataType
> = async () => {
	const productsData = await fetch('http://localhost:8000/products').then(
		(data) => data.json()
	);

	return {
		props: {
			productsData,
		},
	};
};

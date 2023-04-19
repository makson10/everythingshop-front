import { GetServerSideProps } from 'next';
import Header from '../components/Header/Header';
import { ProductsList } from './ProductsList/ProductsList';
import { PaginationBar } from './PaginationBar/PaginationBar';
import { IProduct } from '@/pages/types/productTypes';
import { useEffect, useState } from 'react';
import { paginate } from './PaginationBar/paginate';
import FilterBar from './FilterBar/FilterBar';
import { ISortAndFilterParameters } from '../types/sortAndFilterParameters';

interface FetchedDataType {
	products: IProduct[];
}

export default function Assortment({ products }: FetchedDataType) {
	const [sortAndFilterParameters, setSortAndFilterParameters] =
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
		console.log(sortAndFilterParameters);
	}, [sortAndFilterParameters]);

	return (
		<>
			<Header pageName={'Assortment'} />
			<FilterBar setParameters={setSortAndFilterParameters} />
			<ProductsList
				products={productsForDisplay}
				sortParameter={sortAndFilterParameters.sort}
				filterParameter={sortAndFilterParameters.filter}
			/>
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
	const products = await fetch('http://localhost:8000/products').then((data) =>
		data.json()
	);

	return {
		props: {
			products,
		},
	};
};

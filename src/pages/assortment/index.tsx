import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
	filterProducts,
	sortProducts,
	searchProducts,
} from '@/functions/productsTransformation';
import { paginate } from '@/functions/paginate';
import Header from '@/components/Header/Header';
import { ProductType } from '@/types/productTypes';
import { ISortAndFilterParameters } from '@/types/sortOptionsTypes';
import { ProductsList } from './ProductsList/ProductsList';
import { PaginationBar } from './PaginationBar/PaginationBar';
import { ProductsNotFoundPage } from './ProductsNotFoundPage';
import FilterBar from './FilterBar/FilterBar';
import axios from 'axios';

interface FetchedDataType {
	productsData: ProductType;
}

export default function Assortment({ productsData }: FetchedDataType) {
	const [products, setProducts] = useState<ProductType>(productsData);
	const [productListParameters, setProductListParameters] =
		useState<ISortAndFilterParameters>({ filter: '', sort: '', search: '' });

	const [currentPage, setCurrentPage] = useState<number>(1);
	const showingProductAmount = 16;

	const productsForDisplay = paginate(
		products,
		currentPage,
		showingProductAmount
	);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		let searchedProducts = productsData;
		if (productListParameters.search) {
			searchedProducts = searchProducts(
				productListParameters.search,
				productsData
			);
		}

		setProducts(searchedProducts);

		if (
			productListParameters.sort === '' &&
			productListParameters.filter === ''
		) {
			return;
		}

		const filteredProducts = filterProducts(
			productListParameters.filter,
			searchedProducts
		);

		const sortedProducts = sortProducts(
			productListParameters.sort,
			filteredProducts
		);

		setProducts(sortedProducts);
	}, [productListParameters]);

	return (
		<>
			<Header pageName={'Assortment'} />
			<FilterBar setParameters={setProductListParameters} />
			{productsForDisplay.length !== 0 ? (
				<ProductsList products={productsForDisplay} />
			) : (
				<ProductsNotFoundPage />
			)}
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
	try {
		const productsData = await axios(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`
		).then((res) => res.data);

		return {
			props: {
				productsData,
			},
		};
	} catch (error) {
		console.error(error);

		return {
			notFound: true,
		};
	}
};

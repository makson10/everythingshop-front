import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
	filterProducts,
	sortProducts,
	searchProducts,
} from '@/functions/productsTransformation';
import { paginate } from '@/functions/paginate';
import Header from '@/components/Header/Header';
import { ProductsNotFoundPage } from '@/components/ProductsNotFoundPage/ProductsNotFoundPage';
import { ProductsList } from './ProductsList/ProductsList';
import { PaginationBar } from './PaginationBar/PaginationBar';
import FilterBar from './FilterBar/FilterBar';
import { ProductType } from '@/types/productTypes';
import { IProductTransformationParameters } from '@/types/productTransformationTypes';
import axios from 'axios';

interface FetchedDataType {
	productsData: ProductType;
}

export default function Assortment({ productsData }: FetchedDataType) {
	const [products, setProducts] = useState<ProductType>(productsData);
	const [listParameters, setListParameters] =
		useState<IProductTransformationParameters>({
			filter: '',
			sort: '',
			search: '',
		});

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

		if (listParameters.search) {
			searchedProducts = searchProducts(listParameters.search, productsData);
		}

		setProducts(searchedProducts);
	}, [listParameters]);

	useEffect(() => {
		if (listParameters.sort === '' && listParameters.filter === '') {
			return;
		}

		const filteredProducts = filterProducts(
			listParameters.filter,
			productsData
		);

		const sortedProducts = sortProducts(listParameters.sort, filteredProducts);

		setProducts(sortedProducts);
	}, [listParameters]);

	return (
		<>
			<Header pageName={'Assortment'} />
			<FilterBar setParameters={setListParameters} />
			{productsForDisplay.length ? (
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
		return {
			notFound: true,
		};
	}
};

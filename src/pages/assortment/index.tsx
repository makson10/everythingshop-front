import { GetServerSideProps } from 'next';
import Header from '../components/Header/Header';
import { ProductsList } from './ProductsList/ProductsList';
import { PaginationBar } from './PaginationBar/PaginationBar';
import { IProduct } from '@/pages/types/productTypes';

interface FetchedDataType {
	products: IProduct[];
}

export default function Assortment({ products }: FetchedDataType) {
	return (
		<>
			<Header pageName={'Assortment'} />
			<ProductsList products={products} />
			<PaginationBar />
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

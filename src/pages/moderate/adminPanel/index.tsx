import { GetServerSideProps } from 'next';
import { ProductType } from '@/pages/types/productTypes';
import { UserDataType } from '@/pages/types/contextTypes';
import axios from 'axios';
import UsersDataBlock from './UsersDataBlock/UsersDataBlock';
import ProductsBlock from './ProductsBlock/ProductsBlock';
import styles from './adminPanel.module.scss';

interface FetchedData {
	customers: UserDataType;
	products: ProductType;
}

export default function adminPanel({ customers, products }: FetchedData) {
	return (
		<>
			<div id={styles['moderate-page']}>
				<UsersDataBlock customers={customers} />
				<ProductsBlock products={products} />
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedData> = async () => {
	const customers: UserDataType = await axios
		.get('http://127.0.0.1:8000/customers')
		.then((data) => data.data);
	const products: ProductType = await axios
		.get('http://127.0.0.1:8000/products')
		.then((data) => data.data);

	return {
		props: {
			customers,
			products,
		},
	};
};

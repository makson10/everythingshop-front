import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ProductType } from '@/pages/types/productTypes';
import { UserDataType } from '@/pages/types/userTypes';
import { getCookie } from '@/pages/functions/cookiesFunction';
import { useRouter } from 'next/router';
import UsersDataBlock from './UsersDataBlock/UsersDataBlock';
import ProductsBlock from './ProductsBlock/ProductsBlock';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import { FeedbackType } from '@/pages/types/feedbackTypes';
import FeedbackBlock from './FeedbackBlock/FeedbackBlock';
import axios from 'axios';

interface FetchedData {
	customers: UserDataType;
	googleCustomers: UserDataType;
	products: ProductType;
	feedbacks: FeedbackType;
}

export default function adminPanel({
	customers,
	googleCustomers,
	products,
	feedbacks,
}: FetchedData) {
	const router = useRouter();

	useEffect(() => {
		const isAdminAuthorized = getCookie('isAdminAuthorized') === 'true';
		if (!isAdminAuthorized) {
			document.cookie = `isAdminAuthorized=false; max-age=0`;
			router.push('/moderate');
		}
	}, []);

	return (
		<>
			<div className="flex flex-col items-center gap-[40px] p-8 max-sm:px-4">
				<UsersDataBlock
					customers={customers}
					googleCustomers={googleCustomers}
				/>
				<ProductsBlock products={products} />
				<CommentsBlock products={products} />
				<FeedbackBlock feedbacks={feedbacks} />
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedData> = async () => {
	const customers: UserDataType = await axios
		.get('http://127.0.0.1:8000/customers')
		.then((data) => data.data);

	const googleCustomers: UserDataType = await axios
		.get('http://127.0.0.1:8000/googleCustomers')
		.then((data) => data.data);

	const products: ProductType = await axios
		.get('http://127.0.0.1:8000/products')
		.then((data) => data.data);

	const feedbacks: FeedbackType = await axios
		.get('http://127.0.0.1:8000/feedback')
		.then((data) => data.data);

	return {
		props: {
			customers,
			googleCustomers,
			products,
			feedbacks,
		},
	};
};

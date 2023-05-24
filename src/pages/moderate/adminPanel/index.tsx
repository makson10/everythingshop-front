import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import { ProductType } from '@/types/productTypes';
import { UserDataType } from '@/types/userTypes';
import UsersDataBlock from './UsersDataBlock/UsersDataBlock';
import ProductsBlock from './ProductsBlock/ProductsBlock';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import { FeedbackType } from '@/types/feedbackTypes';
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
		const isAdminAuthorized = Cookie.get('isAdminAuthorized') === 'true';
		if (!isAdminAuthorized) {
			Cookie.remove('isAdminAuthorized');
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
		.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`)
		.then((data) => data.data);

	const googleCustomers: UserDataType = await axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers`)
		.then((data) => data.data);

	const products: ProductType = await axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`)
		.then((data) => data.data);

	const feedbacks: FeedbackType = await axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/feedback`)
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

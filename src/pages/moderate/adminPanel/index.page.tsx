import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useCookies from '@/hooks/useCookies';
import useIsAdminAuthorized from '@/hooks/useIsAdminAuthorized';
import { ProductType } from '@/types/productTypes';
import { UserDataType } from '@/types/userTypes';
import { FeedbackType } from '@/types/feedbackTypes';
import UsersDataBlock from './UsersDataBlock/UsersDataBlock';
import ProductsBlock from './ProductsBlock/ProductsBlock';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import FeedbackBlock from './FeedbackBlock/FeedbackBlock';
import axios from 'axios';

interface FetchedData {
	customers: UserDataType;
	googleCustomers: UserDataType;
	products: ProductType;
	feedbacks: FeedbackType;
}

export default function AdminPanel({
	customers,
	googleCustomers,
	products,
	feedbacks,
}: FetchedData) {
	const { removeCookies } = useCookies();
	const router = useRouter();
	const { isAdminAuthorized, isLoading } = useIsAdminAuthorized();

	useEffect(() => {
		if (isLoading) return;

		if (!isAdminAuthorized) {
			removeCookies('isAdminAuthorized');
			router.push('/moderate');
		}
	}, [useIsAdminAuthorized]);

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
	try {
		const customers: UserDataType = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/customers`)
			.then((res) => res.data);

		const googleCustomers: UserDataType = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers`)
			.then((res) => res.data);

		const products: ProductType = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`)
			.then((res) => res.data);

		const feedbacks: FeedbackType = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/feedbacks`)
			.then((res) => res.data);

		return {
			props: {
				customers,
				googleCustomers,
				products,
				feedbacks,
			},
		};
	} catch (error) {
		console.error(error);

		return {
			notFound: true,
		};
	}
};

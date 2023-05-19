import { GetServerSideProps } from 'next';
import { IProduct } from '@/pages/types/productTypes';
import Header from '@/pages/components/Header/Header';
import ProductInfoBlock from './ProductInfoBlock/ProductInfoBlock';
import axios from 'axios';

interface IFetchedData {
	success: boolean;
	data: IProduct;
}

interface FetchedDataType {
	productData: IFetchedData;
}

interface Props {
	productData: IProduct;
}

export default function ProductPage({ productData }: Props) {
	return (
		<div className="flex flex-col h-screen">
			<Header pageName={productData.title || 'unknown'} />
			<ProductInfoBlock productData={productData} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedDataType> = async (
	context
) => {
	const { productName = 'unknownProduct' } = context.params!;

	const productData = await axios(
		`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productName}`
	).then((res) => res.data);

	if (productData.data?.comments.length === 0) {
		productData.data.comments = [];
	} else {
		productData.data.comments = await JSON.parse(productData.data.comments);
	}

	if (!productData.success) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			productData: productData.data,
		},
	};
};

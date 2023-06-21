import { GetServerSideProps } from 'next';
import Header from '@/components/Header/Header';
import { IProduct } from '@/types/productTypes';
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
			<Header pageName={productData.title} />
			<ProductInfoBlock productData={productData} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedDataType> = async (
	context
) => {
	try {
		const { productName } = context.params!;

		const productData = await axios(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productName}`
		).then((res) => res.data);

		if (!productData) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				productData: productData,
			},
		};
	} catch (error) {
		console.error(error);

		return {
			notFound: true,
		};
	}
};

import { GetServerSideProps } from 'next';
import Header from '@/components/Header/Header';
import ProductPageContent from './ProductPageContent/ProductPageContent';
import { IProduct } from '@/types/productTypes';
import axios from 'axios';

interface Props {
	productData: IProduct;
}

interface IFetchedData {
	success: boolean;
	data: IProduct;
}

interface FetchedDataType {
	productData: IFetchedData;
}

export default function ProductPage({ productData }: Props) {
	return (
		<div className="flex flex-col h-screen">
			<Header pageName={productData.title} />
			<ProductPageContent productData={productData} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedDataType> = async (
	context
) => {
	try {
		const { productId } = context.params!;

		const productData = await axios(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productId}`
		).then((res) => res.data);

		if (!productData) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				productData,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

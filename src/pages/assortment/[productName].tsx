import { GetServerSideProps } from 'next';
import { IProductData } from '../types/contextTypes';
import Header from '@/pages/components/Header/Header';
import ProductInfo from './ProductInfo/ProductInfo';

interface IFetchedData {
	success: boolean;
	data: IProductData;
}

interface FetchedDataType {
	productData: IFetchedData;
}

interface Props {
	productData: IProductData;
}

export default function ProductPage({ productData }: Props) {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header pageName={productData.title!} />
			<ProductInfo productData={productData} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedDataType> = async (
	context
) => {
	const { productName = 'unknownProduct' } = context.params!;

	const fetchedData = await fetch(
		`http://127.0.0.1:8000/products/${productName}`
	);
	const productData = await fetchedData.json();

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

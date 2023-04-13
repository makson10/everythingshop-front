import { useRouter } from 'next/router';
import { Header } from './Header/Header';
import ProductInfo from './ProductInfo/ProductInfo';

export default function ProductPage() {
	const router = useRouter();
	const queryData = router.query;
	const { productName } = queryData;

	return (
		<div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
			<Header pageName={productName} routeToGoBack='/assortment' />
			<ProductInfo productData={queryData}/>
		</div>
	);
}

import Header from '@/components/Header/Header';
import PageContent from './PageContent';

export default function AddProduct() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header pageName={'Add Product'} />
			<PageContent />
		</div>
	);
}

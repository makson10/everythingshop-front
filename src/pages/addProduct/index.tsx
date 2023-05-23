import Header from '@/components/Header/Header';
import { AddForm } from './AddForm';

export default function AddProduct() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header pageName={'Add Product'} />
			<AddForm />
		</div>
	);
}

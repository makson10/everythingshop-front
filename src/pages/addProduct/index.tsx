import React from 'react';
import Header from '@/pages/components/Header/Header';
import { AddForm } from './AddForm/AddForm';

export default function AddProduct() {
	return (
		<div
			style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header pageName={'Add Product'} />
			<AddForm />
		</div>
	);
}

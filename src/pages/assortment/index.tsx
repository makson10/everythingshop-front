import React from 'react';
import { GetServerSideProps } from "next";
import { Header } from "./Header/Header";
import { ProductsList } from "./ProductsList/ProductsList";
import { Footer } from "./Footer/Footer";
import { PaginationBar } from "./PaginationBar/PaginationBar";

interface FetchedDataType {
	products: {
		title: string;
		description: string;
		photo_id: string;
		creator: string;
		price: number;
	}[];
}

export default function Assortment({ products }: FetchedDataType) {
	return (
		<>
			<Header pageName={'Assortment'} routeToGoBack='/' />
			<ProductsList products={products} />
			<PaginationBar />
			<Footer />
		</>
	);
}

export const getServerSideProps: GetServerSideProps<FetchedDataType> = async () => {
	const products = await fetch('http://localhost:8000/products')
		.then((data) => data.json());

	return {
		props: {
			products
		}
	}
}

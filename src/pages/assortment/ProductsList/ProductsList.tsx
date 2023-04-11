import React from "react";
import styles from './ProductsList.module.scss';
import { ProductCard } from "@/pages/assortment/ProductsList/ProductCard/ProductCard";
interface Props {
    products: {
        title: string,
        description: string,
        photo_id: string,
        creator: string,
        price: number
    }[];
}

export function ProductsList({ products }: Props) {
    return (
        <div id={styles['product-list']}>
            {products.map((product, index) => {
                    return <ProductCard key={index} productData={product} />
            })}
        </div>
    );
}

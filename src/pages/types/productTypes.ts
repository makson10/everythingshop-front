import { IComment } from './commentTypes';

export interface IProduct {
	title: string;
	description: string;
	photo_id: string;
	creator: string;
	price: number;
	uniqueProductId: string;
	comments: IComment[];
}

export type ProductType = IProduct[];

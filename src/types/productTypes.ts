import { CommentType } from './commentTypes';

export interface IProduct {
	title: string;
	description: string;
	photo_id: string[];
	creator: string;
	price: number;
	uniqueProductId: string;
	comments: CommentType;
}

export type ProductType = IProduct[];
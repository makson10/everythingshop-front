import { CommentType } from './commentTypes';

export interface IProduct {
	title: string;
	description: string;
	photoIds: string[];
	creator: string;
	price: number;
	uniqueProductId: string;
	comments: CommentType;
	imageObjectUrl?: string;
}

export type ProductType = IProduct[];

export interface FormProductType {
	photoFiles?: File[];
	title: string;
	description: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

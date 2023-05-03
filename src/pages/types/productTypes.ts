export interface IProduct {
	title: string;
	description: string;
	photo_id: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export type ProductType = IProduct[];

export interface SubmitFormData {
	fullName: string;
	email: string;
	deliveryAddress: string;
}
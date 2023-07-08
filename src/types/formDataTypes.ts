export interface ConfirmPurchaseFormData {
	fullName: string;
	email: string;
	deliveryAddress: string;
}

export interface IConfirmPurchaseForm {
	firstName: string;
	lastName: string;
	useAccountFullName: boolean;
	email: string;
	useAccountEmail: boolean;
	deliveryAddress: string;
}

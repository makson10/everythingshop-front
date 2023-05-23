export interface SubmitFormData {
	firstName?: string;
	lastName?: string;
	fullName?: string;
	email: string;
	deliveryAddress: string;
}

export interface ISubmitForm {
	firstName: string;
	lastName: string;
	useOldFullName: boolean;
	email: string;
	useOldEmail: boolean;
	deliveryAddress: string;
}

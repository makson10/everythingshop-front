import { Dispatch, SetStateAction } from 'react';

export interface ErrorWindowProps {
	error: string | string[];
}

export interface SuccessWindowProps {
	successText: string;
}

export interface ConfirmPurchaseFormProps {
	handleCloseConfirmPurchaseForm: () => void;
	purchaseTotalPrice: number;
}

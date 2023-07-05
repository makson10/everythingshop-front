import { Dispatch, SetStateAction } from 'react';

export interface ErrorListType {
	error: string | string[];
}

export interface SuccessType {
	successText: string;
}

export interface ShowModalWindowProps {
	setIsOpenSubmitBuyForm: Dispatch<SetStateAction<boolean>>;
	purchaseTotalPrice: number;
}

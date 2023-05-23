import { Dispatch, SetStateAction } from 'react';

export interface ErrorListType {
	errorList: string[];
}

export interface SuccessType {
	successText: string;
}

export interface ShowModalWindowProps {
	setIsOpenSubmitBuyForm: Dispatch<SetStateAction<boolean>>;
	buyCost: number;
}

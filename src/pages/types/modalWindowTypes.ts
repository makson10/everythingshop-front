import { Dispatch, SetStateAction } from "react";

export interface ErrorListType {
	errorList: string[];
}

export interface SuccessType {
	successText: string;
}

export interface ShowModalWindowProps {
	setIsOpenSubmitMenu: Dispatch<SetStateAction<boolean>>;
}
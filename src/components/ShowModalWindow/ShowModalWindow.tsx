import { createPortal } from 'react-dom';
import SuccessMenu from '@/components/SuccessMenu/SuccessMenu';
import ErrorMenu from '@/components/ErrorMenu/ErrorMenu';
import SubmitBuyForm from '@/components/SubmitBuyForm/SubmitBuyForm';
import {
	ErrorListType,
	ShowModalWindowProps,
	SuccessType,
} from '@/types/modalWindowTypes';

export const ShowErrorModalWindow = ({ errorList }: ErrorListType) => {
	return createPortal(
		<ErrorMenu errorList={errorList} />,
		document.querySelector('#portal')!
	);
};

export const ShowSuccessModalWindow = ({ successText }: SuccessType) => {
	return createPortal(
		<SuccessMenu successText={successText} />,
		document.querySelector('#portal')!
	);
};

export const ShowSubmitBuyForm = ({
	setIsOpenSubmitBuyForm,
	buyCost,
}: ShowModalWindowProps) => {
	return createPortal(
		<SubmitBuyForm
			setIsOpenSubmitBuyForm={setIsOpenSubmitBuyForm}
			buyCost={buyCost}
		/>,
		document.querySelector('#portal')!
	);
};

import { createPortal } from 'react-dom';
import {
	ErrorListType,
	ShowModalWindowProps,
	SuccessType,
} from '@/types/modalWindowTypes';
import SuccessMenu from '../SuccessMenu/SuccessMenu';
import ErrorMenu from '../ErrorMenu/ErrorMenu';
import SubmitBuyForm from '@/components/SubmitBuyForm/SubmitBuyForm';

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

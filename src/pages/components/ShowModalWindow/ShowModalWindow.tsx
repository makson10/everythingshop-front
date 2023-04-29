import { createPortal } from 'react-dom';
import { ErrorListType, ActionType } from './modalWindowTypes';
import ErrorWindow from '@/pages/components/ErrorWindow/ErrorWindow';
import SuccessWindow from '@/pages/components/SuccessWindow/SuccessWindow';

export const ShowErrorModalWindow = ({ errorList }: ErrorListType) => {
	return createPortal(
		<ErrorWindow errorList={errorList} />,
		document.querySelector('#portal')!
	);
};

export const ShowSuccessModalWindow = ({ action }: ActionType) => {
	return createPortal(
		<SuccessWindow typeOfSuccess={action} />,
		document.querySelector('#portal')!
	);
};

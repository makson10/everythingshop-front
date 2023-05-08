import { createPortal } from 'react-dom';
import { ErrorListType, ActionType } from './modalWindowTypes';
import SuccessMenu from '../SuccessMenu/SuccessMenu';
import ErrorMenu from '../ErrorMenu/ErrorMenu';

export const ShowErrorModalWindow = ({ errorList }: ErrorListType) => {
	return createPortal(
		<ErrorMenu errorList={errorList} />,
		document.querySelector('#portal')!
	);
};

export const ShowSuccessModalWindow = ({ action }: ActionType) => {
	return createPortal(
		<SuccessMenu typeOfSuccess={action} />,
		document.querySelector('#portal')!
	);
};

import { createPortal } from 'react-dom';
import { ErrorListType, SuccessType } from './modalWindowTypes';
import SuccessMenu from '../SuccessMenu/SuccessMenu';
import ErrorMenu from '../ErrorMenu/ErrorMenu';

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

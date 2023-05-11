import { createPortal } from 'react-dom';
import { ErrorListType, ShowModalWindowProps, SuccessType } from '../../types/modalWindowTypes';
import SuccessMenu from '../SuccessMenu/SuccessMenu';
import ErrorMenu from '../ErrorMenu/ErrorMenu';
import SubmitMenu from '@/pages/components/SubmitMenu/SubmitMenu';

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

export const ShowSubmitMenu = ({ setIsOpenSubmitMenu }: ShowModalWindowProps) => {
	return createPortal(
		<SubmitMenu setIsOpenSubmitMenu={setIsOpenSubmitMenu} />,
		document.querySelector('#portal')!
	);
};

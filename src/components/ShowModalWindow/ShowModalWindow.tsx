import { createPortal } from 'react-dom';
import SuccessMenu from '@/components/SuccessMenu/SuccessMenu';
import ErrorMenu from '@/components/ErrorMenu/ErrorMenu';
import ConfirmPurchaseForm from '@/components/ConfirmPurchaseForm/ConfirmPurchaseForm';
import {
	SuccessWindowProps,
	ErrorWindowProps,
	ConfirmPurchaseFormProps,
} from '@/types/modalWindowTypes';

export const ShowSuccessModalWindow = ({ successText }: SuccessWindowProps) => {
	return createPortal(
		<SuccessMenu successText={successText} />,
		document.querySelector('#portal')!
	);
};

export const ShowErrorModalWindow = ({ error }: ErrorWindowProps) => {
	return createPortal(
		<ErrorMenu error={error} />,
		document.querySelector('#portal')!
	);
};

export const ShowConfirmPurchaseForm = ({
	handleCloseConfirmPurchaseForm,
	purchaseTotalPrice,
}: ConfirmPurchaseFormProps) => {
	return createPortal(
		<ConfirmPurchaseForm
			handleCloseConfirmPurchaseForm={handleCloseConfirmPurchaseForm}
			purchaseTotalPrice={purchaseTotalPrice}
		/>,
		document.querySelector('#portal')!
	);
};

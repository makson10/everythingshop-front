import { createPortal } from 'react-dom';
import SuccessNotification from '@/components/SuccessNotification/SuccessNotification';
import ErrorNotification from '@/components/ErrorNotification/ErrorNotification';
import ConfirmPurchaseForm from '@/components/ConfirmPurchaseForm/ConfirmPurchaseForm';
import FullscreenPhotoCarousel from '@/components/FullscreenPhotoCarousel/FullscreenPhotoCarousel';
import {
	SuccessWindowProps,
	ErrorWindowProps,
	ConfirmPurchaseFormProps,
	FullscreenPhotoCarouselProps,
} from '@/types/modalWindowTypes';

export const ShowSuccessNotification = (props: SuccessWindowProps) => {
	return createPortal(
		<SuccessNotification {...props} />,
		document.querySelector('#portal')!
	);
};

export const ShowErrorNotification = (props: ErrorWindowProps) => {
	return createPortal(
		<ErrorNotification {...props} />,
		document.querySelector('#portal')!
	);
};

export const ShowConfirmPurchaseForm = (props: ConfirmPurchaseFormProps) => {
	return createPortal(
		<ConfirmPurchaseForm {...props} />,
		document.querySelector('#portal')!
	);
};

export const ShowPhotoInFullscreen = (props: FullscreenPhotoCarouselProps) => {
	return createPortal(
		<FullscreenPhotoCarousel {...props} />,
		document.querySelector('#portal')!
	);
};

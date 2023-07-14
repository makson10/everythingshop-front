export interface ErrorWindowProps {
	error: string | string[];
}

export interface SuccessWindowProps {
	successText: string;
}

export interface ConfirmPurchaseFormProps {
	handleCloseConfirmPurchaseForm: () => void;
	purchaseTotalPrice: number;
}

export interface FullscreenPhotoCarouselProps {
	handleClose: () => void;
	photoURLs: string[];
	initialPhotoIndex: number;
}

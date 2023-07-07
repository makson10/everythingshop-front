import { ChangeEvent, useState } from 'react';
import { useUserData } from '@/hooks/useUserDataContext';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import {
	ShowSuccessModalWindow,
	ShowErrorModalWindow,
} from '@/components/ShowModalWindow/ShowModalWindow';
import { FormProductType } from '@/types/productTypes';
import PhotoCarousel from './PhotoCarousel';
import AddProductForm from './AddProductForm';
import axios from 'axios';

export default function PageContent() {
	const authorizedUserData = useUserData();
	const [photoFiles, setPhotoFiles] = useState<File[]>([]);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files) return;

		const file = e.target.files[0];
		setPhotoFiles((prevValue) => [...prevValue, file]);
	};

	const shapeFormDataForStoring = (newProductData: FormProductType) => {
		const formData = new FormData();
		newProductData.photoFiles!.map((file) => {
			formData.append('file', file);
		});
		formData.append('title', newProductData.title);
		formData.append('description', newProductData.description);
		formData.append('creator', newProductData.creator);
		formData.append('price', newProductData.price.toString());
		formData.append('uniqueProductId', newProductData.uniqueProductId);
		formData.append('comments', JSON.stringify([]));

		return formData;
	};

	const handleSubmitForm = async (newProductData: FormProductType) => {
		try {
			if (!newProductData.photoFiles?.length) {
				const error = new Error('File field is empty!');
				throw error;
			}

			const newProductFormData = shapeFormDataForStoring(newProductData);
			axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addNewProduct`,
				newProductFormData
			);

			clearFileInput();
			openSuccessWindow();
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Something went wrong';
			setServerErrorMessage(errorMessage);
			handleFailure();
		}
	};

	const clearFileInput = () => {
		setPhotoFiles([]);
	};

	const openSuccessWindow = () => {
		setIsOpenSuccessWindow(true);
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	if (!authorizedUserData.data?.name) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow error={serverErrorMessage} />}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow
					successText={'You have created your product successful'}
				/>
			)}

			<div className="flex-[2_1_auto] flex justify-center items-center p-6">
				<div className="flex flex-col gap-8 w-[350px]">
					<h1 className="text-4xl text-center">Add new product</h1>
					<div className="flex flex-col">
						<div className="flex flex-col gap-4">
							<PhotoCarousel
								photoFiles={photoFiles}
								handleFileInput={handleFileInput}
							/>
							<AddProductForm
								photoFiles={photoFiles}
								handleSubmitForm={handleSubmitForm}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

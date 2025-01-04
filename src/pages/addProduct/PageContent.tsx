import { ChangeEvent, useState } from 'react';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import {
	ShowSuccessNotification,
	ShowErrorNotification,
} from '@/components/ShowModalWindow/ShowModalWindow';
import PhotoCarousel from './PhotoCarousel';
import AddProductForm from './AddProductForm';
import { FormProductType } from '@/types/productTypes';
import imageCompression from 'browser-image-compression';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

export default function PageContent() {
	const user = useAppSelector((state) => state.user.data);
	const [photoFiles, setPhotoFiles] = useState<File[]>([]);
	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const compressFile = async (file: File) => {
		const options = {
			maxSizeMB: 5,
			maxWidthOrHeight: 1920,
		};

		const compressedFile = await imageCompression(file, options);
		return compressedFile;
	};

	const handleAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files) return;
		setIsLoading(true);

		let file = e.target.files[0];

		if (file.size > 4 * 1024 * 1024) {
			file = await compressFile(file);
		}

		setPhotoFiles((prevValue) => [...prevValue, file]);
		setIsLoading(false);
	};

	const handleDeleteFile = (index: number) => {
		const newFileList = [...photoFiles];

		newFileList.splice(index, 1);
		setPhotoFiles(newFileList);
	};

	const storeProduct = async (
		newProductData: FormProductType,
		files: File[]
	) => {
		const formData = new FormData();
		files.map((file) => formData.append('files', file));
		formData.append('title', newProductData.title);
		formData.append('description', newProductData.description);
		formData.append('creator', newProductData.creator);
		formData.append('price', newProductData.price.toString());
		formData.append('uniqueProductId', newProductData.uniqueProductId);
		formData.append('comments', JSON.stringify([]));

		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addNewProduct`,
			formData
		);
	};

	const handleSubmitForm = async (newProductData: FormProductType) => {
		try {
			if (!photoFiles.length) {
				const error = new Error('File field is empty!');
				throw error;
			}

			setIsLoading(true);
			await storeProduct(newProductData, photoFiles);

			clearFileInput();
			setIsLoading(false);
			openSuccessWindow();
		} catch (error: any) {
			handleFailure(error);
		}
	};

	const clearFileInput = () => {
		setPhotoFiles([]);
	};

	const openSuccessWindow = () => {
		setIsOpenSuccessWindow(true);
		setTimeout(() => setIsOpenSuccessWindow(false), 3000);
	};

	const handleFailure = (error: any) => {
		const errorMessage =
			error.response?.data?.error || error.message || 'Something went wrong';
		setServerErrorMessage(errorMessage);

		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	if (!user?.name) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenErrorWindow && (
				<ShowErrorNotification error={serverErrorMessage} />
			)}

			{isOpenSuccessWindow && (
				<ShowSuccessNotification
					successText={'You have created your product successful'}
				/>
			)}

			{isLoading ? (
				<div className="flex-[2_1_auto] z-50 flex flex-col justify-center items-center">
					<LoadingSpinner />
				</div>
			) : (
				<div className="flex-[2_1_auto] flex justify-center items-center p-6">
					<div className="flex flex-col gap-8 w-[350px]">
						<h1 className="text-4xl text-center">Add new product</h1>
						<div className="flex flex-col">
							<div className="flex flex-col gap-8">
								<PhotoCarousel
									photoFiles={photoFiles}
									handleAddFile={handleAddFile}
									handleDeleteFile={handleDeleteFile}
								/>
								<AddProductForm handleSubmitForm={handleSubmitForm} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

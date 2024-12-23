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
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useAppSelector } from '@/store/hooks';

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

		if (file.size > 5 * 1024 * 1024) {
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

	const getPhotoAccessKey = async () => {
		const key = await axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
			)
			.then((res) => res.data.token);

		return key;
	};

	const saveFileInGoogleDrive = async (file: File, photoAccessKey: string) => {
		const fileId = await axios
			.post(
				'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
				file,
				{
					headers: {
						'Content-Type': file.type,
						'Content-Length': file.size,
						Authorization: 'Bearer ' + photoAccessKey,
					},
				}
			)
			.then((res) => res.data.id);

		return fileId;
	};

	const storePhotoFiles = async () => {
		const photoAccessKey = await getPhotoAccessKey();
		const fileIds: string[] = [];

		const storeFilePromises = photoFiles.map(async (file) => {
			const fileId = await saveFileInGoogleDrive(file, photoAccessKey);
			fileIds.push(fileId);
		});

		await Promise.all(storeFilePromises);

		return fileIds;
	};

	const shapeDataForStoring = (
		{ title, description, creator, price, uniqueProductId }: FormProductType,
		fileIds: string[]
	) => {
		const newProductData = {
			photoIds: fileIds,
			title: title,
			description: description,
			creator: creator,
			price: price,
			comments: JSON.stringify([]),
			uniqueProductId: uniqueProductId,
		};

		return newProductData;
	};

	const handleSubmitForm = async (newProductData: FormProductType) => {
		try {
			if (!photoFiles.length) {
				const error = new Error('File field is empty!');
				throw error;
			}

			setIsLoading(true);
			const fileIds = await storePhotoFiles();
			const newProduct = shapeDataForStoring(newProductData, fileIds);

			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/addNewProduct`,
				newProduct
			);

			clearFileInput();
			setIsLoading(false);
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
								<AddProductForm
									photoFiles={photoFiles}
									handleSubmitForm={handleSubmitForm}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

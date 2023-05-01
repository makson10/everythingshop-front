import React, {
	ChangeEvent,
	LegacyRef,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/router';
import { validateProductData } from '@/pages/functions/validateFunctions';
import { useUserData } from '@/pages/context/UserDataContext';
import UserNotLoginWindow from '../UserNotLoginWindow/UserNotLoginWindow';
import styles from './AddForm.module.scss';
import Button from '@/pages/components/Button/Button';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
	ShowSuccessModalWindow,
	ShowErrorModalWindow,
} from '@/pages/components/ShowModalWindow/ShowModalWindow';
import Input from '@/pages/components/Input/Input';

interface ProductDataType {
	photoFile: File;
	title: string;
	description: string;
	creator: string;
	price: number;
}

export function AddForm() {
	const authorizationUserData = useUserData();

	const [fileInputLabel, setFileInputLabel] = useState<string>(
		'Enter product photo'
	);
	const [photoFile, setPhotoFile] = useState<File | undefined>();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [price, setPrice] = useState<number>(0);

	const inputFileRef = useRef<HTMLInputElement>();
	const inputTitleRef = useRef<HTMLInputElement>();
	const inputDescritpionRef = useRef<HTMLTextAreaElement>();
	const inputPriceRef = useRef<HTMLInputElement>();
	const buttonRef = useRef<HTMLButtonElement>();

	const [errorList, setErrorList] = useState<string[]>([]);
	const [mainValidateEnd, setMainValidateEnd] = useState<boolean>(false);
	const [secondValidateEnd, setSecondValidateEnd] = useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			let file = e.target.files[0];
			if (file.name.length > 31) {
				setFileInputLabel(file.name.slice(0, 26));
			} else {
				setFileInputLabel(file.name);
			}

			setPhotoFile(file);
		}
	};

	const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setTitle(e.target.value);
	};

	const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		setDescription(e.target.value);
	};

	const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPrice(+e.target.value);
	};

	const handleSubmit = () => {
		const user: ProductDataType = {
			photoFile: photoFile!,
			title: title,
			description: description,
			creator: 'Maksim',
			price: price,
		};

		if (!checkNullInField(user)) {
			const errors = validateProductData(user);
			setErrorList(errors);
		}

		setMainValidateEnd(true);
	};

	const checkNullInField = ({
		photoFile,
		title,
		description,
		price,
	}: ProductDataType) => {
		let haveEmptyField: boolean = false;
		if (
			photoFile === null ||
			photoFile === undefined ||
			title === '' ||
			description === '' ||
			price === 0
		) {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	};

	const sendDataToServer = async (user: ProductDataType) => {
		const formData = new FormData();
		formData.append('file', user.photoFile);
		formData.append('title', user.title);
		formData.append('description', user.description);
		formData.append('creator', user.creator);
		formData.append('price', user.price.toString());
		formData.append('uniqueProductId', uuidv4());

		try {
			const csrfToken = await axios.get('http://127.0.0.1:8000/products');

			const addProductResult = await axios.post(
				'http://127.0.0.1:8000/products/addNewProduct',
				formData
			);

			console.log(addProductResult);
			if (!addProductResult.data.success) {
				setErrorList([addProductResult.data.errorMessage]);
			}
		} catch (error) {
			console.error(error);
		}

		setSecondValidateEnd(true);
	};

	const clearAllInputVariables = () => {
		setPhotoFile(undefined);
		setTitle('');
		setDescription('');
		setPrice(0);
	};

	const clearInputField = (
		...inputRefs: MutableRefObject<
			HTMLInputElement | HTMLTextAreaElement | undefined
		>[]
	) => {
		inputRefs.map((inputRef) => {
			if (inputRef.current) inputRef.current.value = '';
		});
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		clearInputField(
			inputFileRef,
			inputTitleRef,
			inputDescritpionRef,
			inputPriceRef
		);
		clearAllInputVariables();

		if (buttonRef.current) buttonRef.current.disabled = true;
		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			setMainValidateEnd(false);
			setSecondValidateEnd(false);
		}, 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);
		if (buttonRef.current) buttonRef.current.disabled = true;

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setErrorList([]);
			if (buttonRef.current) buttonRef.current.disabled = false;
			setMainValidateEnd(false);
			setSecondValidateEnd(false);
		}, 3000);
	};

	useEffect(() => {
		if (!mainValidateEnd) return;

		if (errorList.length === 0) {
			const user: ProductDataType = {
				photoFile: photoFile!,
				title: title,
				description: description,
				creator: authorizationUserData.data?.name || 'guess',
				price: price,
			};

			sendDataToServer(user);
		} else {
			handleFailure();
		}
	}, [mainValidateEnd]);

	useEffect(() => {
		if (!secondValidateEnd) return;

		if (errorList.length === 0) {
			handleSuccess();
		} else {
			handleFailure();
		}
	}, [secondValidateEnd]);

	if (!authorizationUserData.data?.name) {
		return <UserNotLoginWindow />;
	}

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={errorList} />}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow action={'added your product'} />
			)}

			<div id={styles['form-page']}>
				<div id={styles['form-wrapper']}>
					<h1 id={styles['form-wrapper-title']}>Add new product</h1>
					<div className={styles['form-wrapper']}>
						<div className={styles['input-wrapper']}>
							<label className={styles['form-file-input']}>
								<img src="https://img.icons8.com/ios/50/null/upload-to-cloud--v1.png" />
								<p className={styles['form-file-input-label']}>
									{fileInputLabel}
								</p>
								<input
									className={styles['file-input']}
									type="file"
									accept="image/*"
									ref={inputFileRef as LegacyRef<HTMLInputElement>}
									onChange={handleFileInput}
								/>
							</label>
							<Input
								placeholder="Enter product title"
								maxLength={18}
								inputRef={inputTitleRef as LegacyRef<HTMLInputElement>}
								onChangeFunction={handleTitle}
							/>
							<textarea
								className={styles['form-input']}
								placeholder="Enter product description"
								maxLength={255}
								rows={5}
								style={{ resize: 'none' }}
								ref={inputDescritpionRef as LegacyRef<HTMLTextAreaElement>}
								onChange={handleDescription}
							/>
							<Input
								type="number"
								placeholder="Enter product price"
								min={1}
								max={9999999}
								inputRef={inputPriceRef as LegacyRef<HTMLInputElement>}
								onChangeFunction={handlePrice}
							/>
						</div>
						<Button
							text="Add product"
							buttonRef={buttonRef}
							callbackFunc={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

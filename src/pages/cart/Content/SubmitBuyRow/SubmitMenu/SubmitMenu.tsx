import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	clearInputField,
	validateBuySubmitData,
} from '@/pages/functions/validateFunctions';
import { useUserData } from '@/pages/context/UserDataContext';
import Button from '@/pages/components/Button/Button';
import {
	ShowErrorModalWindow,
	ShowSuccessModalWindow,
} from '@/pages/components/ShowModalWindow/ShowModalWindow';
import Input from '@/pages/components/Input/Input';
import styles from './SubmitMenu.module.scss';
import { useRouter } from 'next/router';
import { SubmitFormData } from '@/pages/types/productTypes';
import { useCartUpdateContext } from '@/pages/context/CartContext';

interface Props {
	setIsOpenSubmitMenu: Dispatch<SetStateAction<boolean>>;
}

export default function SubmitMenu({ setIsOpenSubmitMenu }: Props) {
	const authorizedUserData = useUserData();
	const { deleteAllProducts } = useCartUpdateContext();

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [useOldFullName, setUseOldFullName] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [useOldEmail, setUseOldEmail] = useState<boolean>(false);
	const [deliveryAddress, setDeliveryAddress] = useState<string>('');

	const inputFirstNameRef = useRef<HTMLInputElement>(null);
	const inputLastNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputDeliveryAddressRef = useRef<HTMLInputElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>();

	const [errorList, setErrorList] = useState<string[]>([]);
	const [mainValidateEnd, setMainValidateEnd] = useState<boolean>(false);
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const router = useRouter();

	const handleCloseButton = () => {
		setIsOpenSubmitMenu(false);
	};

	const handleFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setFirstName(e.target.value);
	};

	const handleLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLastName(e.target.value);
	};

	const handleUseOldFullNameInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUseOldFullName((prevValue) => !prevValue);
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handleUseOldEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUseOldEmail((prevValue) => !prevValue);
	};

	const handleDeliveryAddressInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.preventDefault();
		setDeliveryAddress(e.target.value);
	};

	const handleSubmit = () => {
		const fullName = `${firstName} ${lastName}` || 'fuck u';

		const userFullName = useOldFullName
			? typeof authorizedUserData.data?.name === 'string'
				? authorizedUserData.data?.name
				: fullName
			: fullName;
		const userEmail = useOldEmail
			? typeof authorizedUserData.data?.email === 'string'
				? authorizedUserData.data?.email
				: email
			: email;

		const submitFormData: SubmitFormData = {
			fullName: userFullName,
			email: userEmail,
			deliveryAddress: deliveryAddress,
		};

		if (!checkDataOnNull(submitFormData)) {
			setErrorList(validateBuySubmitData(submitFormData));
		}

		setMainValidateEnd(true);
	};

	const checkDataOnNull = ({
		fullName,
		email,
		deliveryAddress,
	}: SubmitFormData) => {
		let haveEmptyField: boolean = false;

		if (fullName === '' || email === '' || deliveryAddress === '') {
			setErrorList(['Some of your field is not fill!']);
			haveEmptyField = true;
		}

		return haveEmptyField;
	};

	const clearAllInputVariables = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setDeliveryAddress('');
	};

	const handleSuccess = () => {
		setIsOpenSuccessWindow(true);

		clearInputField(
			inputFirstNameRef,
			inputLastNameRef,
			inputEmailRef,
			inputDeliveryAddressRef
		);
		clearAllInputVariables();

		if (submitButtonRef.current) submitButtonRef.current.disabled = true;
		setTimeout(() => {
			setIsOpenSuccessWindow(false);
			router.push('/');
			deleteAllProducts();
			setMainValidateEnd(false);
		}, 3000);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);
		if (submitButtonRef.current) submitButtonRef.current.disabled = true;

		setTimeout(() => {
			setIsOpenErrorWindow(false);
			setErrorList([]);
			if (submitButtonRef.current) submitButtonRef.current.disabled = false;
			setMainValidateEnd(false);
		}, 3000);
	};

	useEffect(() => {
		if (!mainValidateEnd) return;
		errorList.length === 0 ? handleSuccess() : handleFailure();
	}, [mainValidateEnd]);

	useEffect(() => {
		if (inputFirstNameRef.current)
			inputFirstNameRef.current.disabled = useOldFullName;
		if (inputLastNameRef.current)
			inputLastNameRef.current.disabled = useOldFullName;
	}, [useOldFullName]);

	useEffect(() => {
		if (inputEmailRef.current) inputEmailRef.current.disabled = useOldEmail;
	}, [useOldEmail]);

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow errorList={errorList} />}
			{isOpenSuccessWindow && (
				<ShowSuccessModalWindow action={'bought your product'} />
			)}

			<div id={styles['submit-form']}>
				<div id={styles['form-wrapper']}>
					<button
						id={styles['close-modal-menu-button']}
						onClick={handleCloseButton}>
						&times;
					</button>
					<h1 id={styles['form-wrapper-title']}>Buy Form</h1>
					<div className={styles['registration-form-wrapper']}>
						<div className={styles['form-input-wrapper']}>
							<Input
								inputRef={inputFirstNameRef}
								placeholder="Enter your first name"
								onChangeFunction={handleFirstNameInput}
							/>
							<Input
								inputRef={inputLastNameRef}
								placeholder="Enter your last name"
								onChangeFunction={handleLastNameInput}
							/>
							<div className="flex flex-row gap-3">
								<input
									type="checkbox"
									id="useOldFullName"
									onChange={handleUseOldFullNameInput}
									checked={useOldFullName}
								/>
								<label htmlFor="useOldFullName">Use old full name</label>
							</div>
							<Input
								inputRef={inputEmailRef}
								placeholder="Enter your email"
								onChangeFunction={handleEmailInput}
							/>
							<div className="flex flex-row gap-3">
								<input
									type="checkbox"
									id="useOldEmail"
									onChange={handleUseOldEmailInput}
									checked={useOldEmail}
								/>
								<label htmlFor="useOldEmail">Use old email</label>
							</div>
							<Input
								inputRef={inputDeliveryAddressRef}
								placeholder="Enter your delivery address"
								onChangeFunction={handleDeliveryAddressInput}
							/>
							<Button
								text="Submit"
								callbackFunc={handleSubmit}
								buttonRef={submitButtonRef}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

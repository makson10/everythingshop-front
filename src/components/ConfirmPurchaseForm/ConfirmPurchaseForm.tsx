import { useRouter } from 'next/router';
import { useUserData } from '@/hooks/useUserDataContext';
import { useUpdateCartContext } from '@/hooks/useCartContext';
import useSendEmail from '@/hooks/useSendEmail';
import { ShowErrorModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import Header from './Parts/Header';
import CloseButton from './Parts/CloseButton';
import Form from './Parts/Form';
import {
	IConfirmPurchaseForm,
	ConfirmPurchaseFormData,
} from '@/types/formDataTypes';
import { useState } from 'react';

interface Props {
	handleCloseConfirmPurchaseForm: () => void;
	purchaseTotalPrice: number;
}

export default function ConfirmPurchaseForm({
	handleCloseConfirmPurchaseForm,
	purchaseTotalPrice,
}: Props) {
	const authorizedUserData = useUserData();
	const { deleteAllProducts } = useUpdateCartContext();
	const { sendBuyEmail } = useSendEmail();

	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmitForm = (values: IConfirmPurchaseForm) => {
		try {
			const userCredential = shapeUserCredential(values);
			sendDataToServer(userCredential);
			sendEmailAboutPurchase(userCredential);
			cleanCart();
			redirectUserToHomePage();
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Something went wrong';
			setServerErrorMessage(errorMessage);
			handleFailure();
		}
	};

	const shapeUserCredential = (formValues: IConfirmPurchaseForm) => {
		const formFullName = `${formValues.firstName} ${formValues.lastName}`;

		const fullName =
			formValues.useAccountFullName &&
			typeof authorizedUserData.data?.name === 'string'
				? authorizedUserData.data?.name
				: formFullName;
		const email =
			formValues.useAccountEmail &&
			typeof authorizedUserData.data?.email === 'string'
				? authorizedUserData.data?.email
				: formValues.email;

		const userCredential: ConfirmPurchaseFormData = {
			fullName: fullName,
			email: email,
			deliveryAddress: formValues.deliveryAddress,
		};

		return userCredential;
	};

	const sendDataToServer = (userCredential: ConfirmPurchaseFormData) => {
		//* sending data to server... don't done yet...
	};

	const sendEmailAboutPurchase = ({
		fullName,
		email,
	}: ConfirmPurchaseFormData) => {
		sendBuyEmail(email, {
			purchaseTotalPrice: purchaseTotalPrice,
			fullUserName: fullName,
		});
	};

	const cleanCart = () => {
		deleteAllProducts();
	};

	const redirectUserToHomePage = () => {
		router.push('/');
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow error={serverErrorMessage} />}

			<div className="z-50 fixed w-full h-screen bg-black/[0.6] flex justify-center items-center overflow-hidden dark:text-black max-sm:px-4">
				<div className="relative w-fit px-[4rem] py-[3rem] flex flex-col justify-center items-center gap-[30px] bg-white rounded-2xl max-sm:w-full">
					<CloseButton handleClick={handleCloseConfirmPurchaseForm} />
					<Header />
					<Form handleSubmitForm={handleSubmitForm} />
				</div>
			</div>
		</>
	);
}

import { useEffect, useRef, useState } from 'react';
import { ShowConfirmPurchaseForm } from '@/components/ShowModalWindow/ShowModalWindow';

interface Props {
	purchaseTotalPrice: number;
}

export default function TotalPriceSection({ purchaseTotalPrice }: Props) {
	const [isOpenConfirmPurchaseForm, setIsOpenConfirmPurchaseForm] =
		useState<boolean>(false);
	const submitButtonRef = useRef<HTMLButtonElement>();

	const handleSubmitBuy = () => {
		setIsOpenConfirmPurchaseForm(true);
	};

	const handleCloseConfirmPurchaseForm = () => {
		setIsOpenConfirmPurchaseForm(false);
	};

	useEffect(() => {
		if (submitButtonRef.current)
			submitButtonRef.current.disabled = isOpenConfirmPurchaseForm;
	}, [isOpenConfirmPurchaseForm]);

	return (
		<>
			{isOpenConfirmPurchaseForm && (
				<ShowConfirmPurchaseForm
					handleCloseConfirmPurchaseForm={handleCloseConfirmPurchaseForm}
					purchaseTotalPrice={purchaseTotalPrice}
				/>
			)}

			<div>
				<p className="text-xl font-bold text-center">
					Total: ${purchaseTotalPrice}
				</p>
				<button
					onClick={handleSubmitBuy}
					className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
					Confirm purchase
				</button>
			</div>
		</>
	);
}

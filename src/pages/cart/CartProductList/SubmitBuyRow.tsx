import { useEffect, useRef, useState } from 'react';
import { ShowSubmitBuyForm } from '@/components/ShowModalWindow/ShowModalWindow';

interface Props {
	costSum: number;
}

export function SubmitBuyRow({ costSum }: Props) {
	const [isOpenSubmitBuyForm, setIsOpenSubmitBuyForm] =
		useState<boolean>(false);
	const submitButtonRef = useRef<HTMLButtonElement>();

	const handleSubmitBuy = () => {
		setIsOpenSubmitBuyForm(true);
	};

	useEffect(() => {
		if (submitButtonRef.current)
			submitButtonRef.current.disabled = isOpenSubmitBuyForm;
	}, [isOpenSubmitBuyForm]);

	return (
		<>
			{isOpenSubmitBuyForm && (
				<ShowSubmitBuyForm
					setIsOpenSubmitBuyForm={setIsOpenSubmitBuyForm}
					purchaseTotalPrice={costSum}
				/>
			)}

			<div>
				<p className="text-xl font-bold text-center">Total: ${costSum}</p>
				<button
					onClick={handleSubmitBuy}
					className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
					Submit Buy
				</button>
			</div>
		</>
	);
}

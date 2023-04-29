import { useEffect, useState } from 'react';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import Button from '@/pages/components/Button/Button';
import { ShowSuccessModalWindow } from '@/pages/components/ShowModalWindow/ShowModalWindow';
import styles from './SubmitBuyRow.module.scss';

interface Props {
	costSum: number;
}

export function SubmitBuyRow({ costSum }: Props) {
	const { deleteAllProducts } = useCartUpdateContext();
	const [isOpenSuccesWindow, setIsOpenSuccesWindow] = useState<boolean>(false);

	const handleSubmitBuy = () => {
		setIsOpenSuccesWindow(true);
	};

	useEffect(() => {
		if (!isOpenSuccesWindow) return;

		setTimeout(() => {
			setIsOpenSuccesWindow(false);
			deleteAllProducts();
		}, 3000);
	}, [isOpenSuccesWindow]);

	return (
		<>
			{isOpenSuccesWindow && (
				<ShowSuccessModalWindow action={`bought products($${costSum})`} />
			)}
			<div id={styles['submit-buy-row']}>
				<p id={styles['cost-sum']}>Total: ${costSum}</p>
				<Button text="Submit" callbackFunc={handleSubmitBuy} />
			</div>
		</>
	);
}

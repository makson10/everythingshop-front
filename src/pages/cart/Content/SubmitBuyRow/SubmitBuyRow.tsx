import { useEffect, useState } from 'react';
import SuccessWindow from '@/pages/components/SuccessWindow/SuccessWindow';
import { createPortal } from 'react-dom';
import styles from './SubmitBuyRow.module.scss';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import Button from '@/pages/components/Button/Button';

interface Props {
	costSum: number;
}

interface ActionType {
	action: string;
}

const ShowSuccessModalWindow = ({ action }: ActionType) => {
	return createPortal(
		<SuccessWindow typeOfSuccess={action} />,
		document.querySelector('#portal')!
	);
};

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

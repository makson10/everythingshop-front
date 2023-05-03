import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Button from '@/pages/components/Button/Button';
import SubmitMenu from './SubmitMenu/SubmitMenu';
import styles from './SubmitBuyRow.module.scss';
import { createPortal } from 'react-dom';

interface Props {
	costSum: number;
}

interface ShowModalWindowProps {
	setIsOpenSubmitMenu: Dispatch<SetStateAction<boolean>>;
}

const ShowSubmitMenu = ({ setIsOpenSubmitMenu }: ShowModalWindowProps) => {
	return createPortal(
		<SubmitMenu setIsOpenSubmitMenu={setIsOpenSubmitMenu} />,
		document.querySelector('#portal')!
	);
};

export function SubmitBuyRow({ costSum }: Props) {
	const [isOpenSubmitMenu, setIsOpenSubmitMenu] = useState<boolean>(false);
	const submitButtonRef = useRef<HTMLButtonElement>();

	const handleSubmitBuy = () => {
		setIsOpenSubmitMenu(true);
	};

	useEffect(() => {
		if (submitButtonRef.current)
			submitButtonRef.current.disabled = isOpenSubmitMenu;
	}, [isOpenSubmitMenu]);

	return (
		<>
			{isOpenSubmitMenu && (
				<ShowSubmitMenu setIsOpenSubmitMenu={setIsOpenSubmitMenu} />
			)}

			<div id={styles['submit-buy-row']}>
				<p id={styles['cost-sum']}>Total: ${costSum}</p>
				<Button
					text="Submit"
					callbackFunc={handleSubmitBuy}
					buttonRef={submitButtonRef}
				/>
			</div>
		</>
	);
}

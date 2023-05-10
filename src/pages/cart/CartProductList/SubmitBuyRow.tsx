import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import SubmitMenu from './SubmitMenu/SubmitMenu';
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

			<div>
				<p className="text-xl font-bold">Total: ${costSum}</p>
				<button
					onClick={handleSubmitBuy}
					className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
					Submit Buy
				</button>
			</div>
		</>
	);
}

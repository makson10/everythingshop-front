import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useUpdateUserData } from '@/hooks/useUserDataContext';
import { useUpdateCartContext } from '@/hooks/useCartContext';

interface Props {
	isOpen: boolean;
	setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
	setIsUserLogin: Dispatch<SetStateAction<boolean>>;
}

export default function ModalMenu({
	isOpen,
	setIsOpenMenu,
	setIsUserLogin,
}: Props) {
	const { deleteData } = useUpdateUserData();
	const { deleteAllProducts } = useUpdateCartContext();
	const menuRef = useRef<HTMLDivElement>(null);

	function handleLogOut() {
		if (!isOpen) return;

		deleteData();
		deleteAllProducts();
		setIsUserLogin(false);
	}

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutOfMenu = (event: any) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpenMenu((prevValue) => false);
			}
		};

		setTimeout(() => {
			document.addEventListener('click', handleClickOutOfMenu);
		}, 1);

		return () => {
			document.removeEventListener('click', handleClickOutOfMenu);
		};
	}, [isOpen]);

	return (
		<>
			<div
				ref={menuRef}
				className={`absolute transition-all ${
					isOpen
						? 'z-50 flex flex-col opacity-1 translate-y-[60%]'
						: 'z-[-1] opacity-0 transform-y-[-60%]'
				}`}>
				<div className="flex justify-center">
					<div className="w-0 h-0 bg-transparent relative border-transparent border-[10px] border-b-black dark:border-b-white border-b-[10px] dark:top-[1px]"></div>
				</div>
				<div className="flex flex-col gap-[5px] rounded-[1rem] border-[2px] border-black dark:border-white p-2 text-black bg-white">
					<button
						className="bg-transparent p-[0.2rem] text-[1.2rem]"
						onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			</div>
		</>
	);
}

import { useUserDataUpdate } from '@/pages/context/UserDataContext';
import { useEffect, useRef } from 'react';
import { useCartUpdateContext } from '@/pages/context/CartContext';
import styles from './ModalMenu.module.scss';

interface Props {
	isOpen: boolean;
	setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
	setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalMenu = ({ isOpen, setIsOpenMenu, setIsUserLogin }: Props) => {
	const { saveData } = useUserDataUpdate();
	const { deleteAllProducts } = useCartUpdateContext();
	const menuRef = useRef<HTMLDivElement>(null);

	function handleLogOut() {
		saveData({
			name: null,
			age: null,
			email: null,
			login: null,
			password: null,
		});
		if (localStorage.getItem('jwtToken')) localStorage.removeItem('jwtToken');
		setIsUserLogin(false);
		deleteAllProducts();
	}

	useEffect(() => {
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
	}, [menuRef]);

	return (
		<>
			<div
				ref={menuRef}
				id={styles['modal-menu-wrapper']}
				data-state={`${isOpen ? 'open' : 'close'}`}>
				<div id={styles['modal-menu-triangle-wrapper']}>
					<div id={styles['modal-menu-triangle']}></div>
				</div>
				<div id={styles['modal-menu']}>
					<button
						className={styles['modal-menu-button']}
						onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			</div>
		</>
	);
};

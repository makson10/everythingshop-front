import { useEffect, useState } from 'react';
import ModalMenu from './ModalMenu';
import LogInButton from './Buttons/LogInButton';
import UserBadge from './Buttons/UserBadge';
import { useAppSelector } from '@/store/hooks';

export default function UserSection() {
	const user = useAppSelector((state) => state.user);
	const [userName, setUserName] = useState<string>('');
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

	const handleToggleIsOpenMenu = () => {
		setIsOpenMenu((prevValue) => !prevValue);
	};

	useEffect(() => {
		if (user.data?.name) {
			setUserName(user.data?.name);
			setIsUserLogin(true);
		}
	}, [user]);

	if (!isUserLogin) return <LogInButton />;

	return (
		<div className="w-[15%] flex justify-end max-sm:justify-center">
			<UserBadge
				userName={userName}
				handleToggleIsOpenMenu={handleToggleIsOpenMenu}
			/>
			<ModalMenu
				isOpen={isOpenMenu}
				setIsOpenMenu={setIsOpenMenu}
				setIsUserLogin={setIsUserLogin}
			/>
		</div>
	);
}

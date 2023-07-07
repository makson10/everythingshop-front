import { useEffect, useState } from 'react';
import { useUserData } from '@/hooks/useUserDataContext';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import ModalMenu from './ModalMenu';
import LogInButton from './Buttons/LogInButton';
import UserBadge from './Buttons/UserBadge';

export default function UserSection() {
	const userData = useUserData();
	const [userName, setUserName] = useState<string>('');
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

	const handleToggleIsOpenMenu = () => {
		setIsOpenMenu((prevValue) => !prevValue);
	};

	useEffect(() => {
		if (userData.data?.name) {
			setUserName(userData.data?.name);
			setIsUserLogin(true);
		}
	}, [userData]);

	if (userData.isLoading) return <ShowLoadingScreen />;
	if (!isUserLogin) return <LogInButton />;

	return (
		<div className="flex max-sm:justify-center">
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

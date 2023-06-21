import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUserData } from '@/hooks/useUserDataContext';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';
import { ModalMenu } from './ModalMenu';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';

export default function UserButton() {
	const isDarkTheme = useIsDarkTheme();
	const userData = useUserData();
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const router = useRouter();

	const handleToggleIsOpenMenu = () => {
		setIsOpenMenu((prevValue) => !prevValue);
	};

	useEffect(() => {
		if (userData.data?.login || userData.data?.id) setIsUserLogin(true);
		if (userData.data?.name) setUserName(userData.data?.name);
	}, [userData]);

	useEffect(() => {
		if (!isUserLogin) setIsOpenMenu(false);
	}, [isUserLogin]);

	if (userData.isLoading) {
		return <ShowLoadingScreen />;
	}

	if (!isUserLogin) {
		return (
			<div className="flex flex-row gap-3">
				<button
					className="bg-[#fff992] text-black text-[1.2rem] border-black border-[3px] rounded-[10px] p-2 transition-all diration-100 ease-linear hover:scale-[1.1] font-[--main-font-weight]"
					onClick={() => router.push('/signUp')}>
					SignUp/LogIn
				</button>
			</div>
		);
	}

	return (
		<>
			<div
				className="flex justify-around items-center gap-[10px] w-[160px] px-[12px] text-black dark:text-white"
				onClick={handleToggleIsOpenMenu}>
				<button>
					<Image
						className="w-12 rounded-xl"
						src={
							userData.data?.picture
								? userData.data?.picture
								: `https://img.icons8.com/windows/120/${
										isDarkTheme ? 'ffffff' : '000000'
								  }/user-male-circle.png`
						}
						alt="#"
						width={100}
						height={100}
					/>
				</button>
				<p className="font-[600] cursor-pointer">{userName}</p>
			</div>
			<ModalMenu
				isOpen={isOpenMenu}
				setIsOpenMenu={setIsOpenMenu}
				setIsUserLogin={setIsUserLogin}
			/>
		</>
	);
}

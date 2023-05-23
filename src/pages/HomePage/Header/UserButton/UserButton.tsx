import { useUserData } from '@/context/UserDataContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ModalMenu } from './ModalMenu';

export default function UserButton() {
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

	return (
		<>
			{isUserLogin ? (
				<>
					<div
						className="flex justify-around items-center gap-[10px] w-[160px] px-[12px] text-black"
						onClick={handleToggleIsOpenMenu}>
						<button>
							<img
								className="w-12 rounded-xl"
								src={
									userData.data?.picture
										? userData.data?.picture
										: 'https://img.icons8.com/windows/120/null/user-male-circle.png'
								}
								loading="lazy"
							/>
						</button>
						<p className="font-[600] cursor-pointer">{userName}</p>
					</div>
					{isOpenMenu && (
						<ModalMenu
							isOpen={isOpenMenu}
							setIsOpenMenu={setIsOpenMenu}
							setIsUserLogin={setIsUserLogin}
						/>
					)}
				</>
			) : (
				<div className="flex flex-row gap-3">
					<button
						className="bg-[#fff992] text-black text-[1.2rem] border-black border-[3px] rounded-[10px] p-2 transition-all diration-100 ease-linear hover:scale-[1.1]"
						style={{ fontWeight: 'var(--main-font-weight)' }}
						onClick={() => router.push('/signUp')}>
						SignUp/LogIn
					</button>
				</div>
			)}
		</>
	);
}

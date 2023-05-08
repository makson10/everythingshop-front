import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ModalMenu } from './ModalMenu';
import { useUserData } from '@/pages/context/UserDataContext';
import styles from './UserIcon.module.scss';

export default function UserIcon() {
	const userData = useUserData();
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		if (userData.data?.login || userData.data?.id) {
			setIsUserLogin(true);
		}

		if (userData.data?.name) {
			setUserName(userData.data?.name);
		}
	}, [userData]);

	useEffect(() => {
		if (!isUserLogin) {
			setIsOpenMenu(false);
		}
	}, [isUserLogin]);

	return (
		<>
			{isUserLogin ? (
				<>
					<div id={styles['logined-user']}>
						<button
							id={styles['logined-user-button']}
							onClick={() => setIsOpenMenu((prevValue) => !prevValue)}>
							<img
								className="w-12"
								src={
									userData.data?.picture
										? userData.data?.picture
										: 'user-circle.png'
								}
							/>
						</button>
						<p id={styles['logined-user-name']}>{userName}</p>
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
				<div id={styles['button-wrapper']}>
					<button
						id={styles['sign-up-button']}
						onClick={() => router.push('/signUp')}>
						SignUp/LogIn
					</button>
				</div>
			)}
		</>
	);
}

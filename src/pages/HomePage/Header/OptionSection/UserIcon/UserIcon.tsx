import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ModalMenu from './ModalMenu/ModalMenu';
import styles from './UserIcon.module.scss';

export default function UserIcon() {
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('Maks M.');
	const router = useRouter();

	return (
		<>
			{isUserLogin ? (
				<>
					<div id={styles['logined-user']}>
						<button
							id={styles['logined-user-button']}
							onClick={() => setIsOpenMenu((prevValue) => !prevValue)}>
							<img src="user-circle.png" />
						</button>
						<p id={styles['logined-user-name']}>{userName}</p>
					</div>
					{isOpenMenu && <ModalMenu isOpen={isOpenMenu} />}
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

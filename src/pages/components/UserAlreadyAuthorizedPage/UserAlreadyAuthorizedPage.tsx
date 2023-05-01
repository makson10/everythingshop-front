import { useRouter } from 'next/router';
import { useUserDataUpdate } from '@/pages/context/UserDataContext';
import styles from './UserAlreadyAuthorizedPage.module.scss';

export default function UserAlreadyAuthorizedPage() {
	const router = useRouter();
	const { deleteData } = useUserDataUpdate();

	const handleClick = () => {
		if (localStorage.getItem('jwtToken')) localStorage.removeItem('jwtToken');
		if (localStorage.getItem('googleJWTToken'))
			localStorage.removeItem('googleJWTToken');
		router.reload();
	};

	return (
		<div id={styles['page']}>
			<div id={styles['message-wrapper']}>
				<h1 id={styles['message']}>You are already authorized</h1>
				<button id={styles['log-out-button']} onClick={handleClick}>
					Log Out
				</button>
			</div>
		</div>
	);
}

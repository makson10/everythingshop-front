import { useRouter } from 'next/router';
import { useUserDataUpdate } from '@/pages/context/UserDataContext';
import styles from './UserAlreadyAuthorizedPage.module.scss';

export default function UserAlreadyAuthorizedPage() {
	const { deleteData, deleteTokens } = useUserDataUpdate();
	const router = useRouter();

	const handleClick = () => {
		deleteData();
		deleteTokens();
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

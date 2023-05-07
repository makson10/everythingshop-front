import Link from 'next/link';
import styles from './UserNotLoginWindow.module.scss';

export default function UserNotLoginWindow() {
	return (
		<div id={styles['window-wrapper']}>
			<div id={styles['message-wrapper']}>
				<p id={styles['message-text']}>You haven't login yet</p>
				<div id={styles['message-link-wrapper']}>
					<Link href={'/signUp'} id={styles['message-link']}>
						SignUp/LogIn
					</Link>
				</div>
			</div>
		</div>
	);
}

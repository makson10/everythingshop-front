import { IUserData } from '@/pages/types/contextTypes';
import styles from './UserRow.module.scss';

interface Props {
	customer: IUserData;
}

export default function UserRow({ customer }: Props) {
	return (
		<div id={styles['user-row']}>
			<p>
				<b>{customer.name}</b>, {customer.age}, {customer.email}
			</p>
			<p>
				Login: {customer.login}, Password: {customer.password}
			</p>
		</div>
	);
}

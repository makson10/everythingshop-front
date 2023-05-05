import { UserDataType } from '@/pages/types/contextTypes';
import UserRow from './UserRow/UserRow';
import styles from './UsersDataBlock.module.scss';

interface Props {
	customers: UserDataType;
	googleCustomers: UserDataType;
}

export default function UsersDataBlock({ customers, googleCustomers }: Props) {
	return (
		<div id={styles['users-data-block']}>
			<p id={styles['block-title']}>Users</p>
			<div id={styles['users-list']}>
				{customers.map((customer, index) => {
					return <UserRow key={index} customer={customer} />;
				})}
				{googleCustomers.map((customer, index) => {
					return (
						<UserRow key={index} customer={customer} isGoogleCustomers={true} />
					);
				})}
			</div>
		</div>
	);
}

import { UserDataType } from '@/pages/types/userTypes';
import UserRow from './UserRow';
import styles from './UsersDataBlock.module.css';

interface Props {
	customers: UserDataType;
	googleCustomers: UserDataType;
}

export default function UsersDataBlock({ customers, googleCustomers }: Props) {
	return (
		<div id={styles['users-data-block']}>
			<p id={styles['block-title']}>Users</p>
			<div id={styles['users-list']}>
				{customers.length === 0 && googleCustomers.length === 0 ? (
					<div className="flex justify-center items-center h-full">
						<p className="text-xl">No users yet</p>
					</div>
				) : (
					customers.map((customer, index) => {
						return <UserRow key={index} customer={customer} />;
					})
				)}
				{googleCustomers.map((customer, index) => {
					return (
						<UserRow key={index} customer={customer} isGoogleCustomers={true} />
					);
				})}
			</div>
		</div>
	);
}

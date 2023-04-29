import { IUserData } from '@/pages/types/contextTypes';
import styles from './UserRow.module.scss';
import { useEffect, useState } from 'react';

interface Props {
	customer: IUserData;
}

export default function UserRow({ customer }: Props) {
	const [customerAge, setCustomerAge] = useState<number>(0);

	useEffect(() => {
		const dateNow = Date.now();
		const customerDateOfBirth = new Date(customer.dateOfBirth);
		const timeDifferent = dateNow - +customerDateOfBirth;

		const age = Math.floor(timeDifferent / 1000 / 60 / 60 / 24 / 365);
		setCustomerAge(age);
	}, []);

	return (
		<div id={styles['user-row']}>
			<p>
				<b>{customer.name}</b>, {customerAge}, {customer.email}
			</p>
			<p>
				Login: {customer.login}, Password: {customer.password}
			</p>
		</div>
	);
}

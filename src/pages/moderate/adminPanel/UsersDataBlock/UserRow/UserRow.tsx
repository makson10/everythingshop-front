import { useEffect, useState } from 'react';
import { IUnionUserData } from '@/pages/types/contextTypes';
import styles from './UserRow.module.scss';

interface Props {
	customer: IUnionUserData;
	isGoogleCustomers?: boolean;
}

export default function UserRow({
	customer,
	isGoogleCustomers = false,
}: Props) {
	const [customerAge, setCustomerAge] = useState<number>(0);

	useEffect(() => {
		if (isGoogleCustomers || !customer.dateOfBirth) return;

		const dateNow = Date.now();
		const customerDateOfBirth = new Date(customer.dateOfBirth);
		const timeDifferent = dateNow - +customerDateOfBirth;

		const age = Math.floor(timeDifferent / 1000 / 60 / 60 / 24 / 365);
		setCustomerAge(age);
	}, []);

	return (
		<div id={styles['user-row']}>
			{isGoogleCustomers ? (
				<>
					<div className="flex flex-row gap-4">
						<img className="w-6" src={customer.picture} />
						<p>
							<b>{customer.name}</b>, {customer.email}
						</p>
						<img src="https://img.icons8.com/color/24/null/google-logo.png" />
					</div>
					<p>ID: {customer.id}</p>
				</>
			) : (
				<>
					<div className="flex flex-row gap-4">
						<img
							className="w-6"
							src="https://img.icons8.com/windows/120/null/user-male-circle.png"
						/>
						<p>
							<b>{customer.name}</b>, {customerAge}, {customer.email}
						</p>
					</div>
					<p>
						Login: {customer.login}, Password: {customer.password}
					</p>
				</>
			)}
		</div>
	);
}

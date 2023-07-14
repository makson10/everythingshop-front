import { memo } from 'react';
import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import UserRow from './UserRow';
import { UserDataType } from '@/types/userTypes';

interface Props {
	customers: UserDataType;
	googleCustomers: UserDataType;
}

export default function UsersDataBlock({ customers, googleCustomers }: Props) {
	const UsersList = memo(function UsersList({
		customers,
	}: {
		customers: UserDataType;
	}) {
		if (customers.length === 0) return null;

		return (
			<>
				{customers.map((customer, index) => {
					return <UserRow key={index} customer={customer} />;
				})}
			</>
		);
	});

	const GoogleUsersList = memo(function GoogleUsersList({
		googleCustomers,
	}: {
		googleCustomers: UserDataType;
	}) {
		if (googleCustomers.length === 0) return null;

		return (
			<>
				{googleCustomers.map((customer, index) => {
					return (
						<UserRow key={index} customer={customer} isGoogleCustomers={true} />
					);
				})}
			</>
		);
	});

	return (
		<AdminPanelBlock blockTitle="Users">
			{customers.length === 0 && googleCustomers.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-xl">No users yet</p>
				</div>
			) : (
				<>
					<UsersList customers={customers} />
					<GoogleUsersList googleCustomers={googleCustomers} />
				</>
			)}
		</AdminPanelBlock>
	);
}

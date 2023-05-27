import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { UserDataType } from '@/types/userTypes';
import UserRow from './UserRow';

interface Props {
	customers: UserDataType;
	googleCustomers: UserDataType;
}

export default function UsersDataBlock({ customers, googleCustomers }: Props) {
	return (
		<AdminPanelBlock blockTitle="Users">
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
		</AdminPanelBlock>
	);
}

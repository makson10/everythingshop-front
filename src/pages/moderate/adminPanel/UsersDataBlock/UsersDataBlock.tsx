import { UserDataType } from '@/types/userTypes';
import UserRow from './UserRow';

interface Props {
	customers: UserDataType;
	googleCustomers: UserDataType;
}

export default function UsersDataBlock({ customers, googleCustomers }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-[10px] max-sm:w-full">
			<p className="text-center text-[1.6rem] font-bold">Users</p>
			<div className="h-[200px] overflow-x-hidden overflow-y-scroll border-black border-[2px] p-4 flex flex-col gap-[10px] max-sm:h-[300px]">
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

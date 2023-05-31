import { useEffect, useState } from 'react';
import Image from 'next/image';
import useDeviceDetect from '@/hooks/useDeviceDetect';
import { IUnionUserData } from '@/types/userTypes';

interface Props {
	customer: IUnionUserData;
	isGoogleCustomers?: boolean;
}

export default function UserRow({
	customer,
	isGoogleCustomers = false,
}: Props) {
	const isMobileDevice = useDeviceDetect();
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
		<div className="flex flex-col gap-[5px] border-b-[2px] border-[gray] p-[0.5rem]">
			{isGoogleCustomers ? (
				<>
					<div className="flex flex-row gap-4 items-center">
						<Image
							className="w-6 max-sm:h-6"
							src={customer.picture!}
							alt="#"
							width={100}
							height={100}
						/>
						<p>
							<b>{customer.name}</b>,{isMobileDevice && <br />} {customer.email}
						</p>
						<Image
							className="w-6 max-sm:h-6"
							src="https://img.icons8.com/color/24/null/google-logo.png"
							alt="#"
							width={100}
							height={100}
						/>
					</div>
					<p>ID: {customer.id}</p>
				</>
			) : (
				<>
					<div className="flex flex-row gap-4 items-center">
						<Image
							className="w-6 max-sm:h-6"
							src="https://img.icons8.com/windows/120/null/user-male-circle.png"
							alt="#"
							width={100}
							height={100}
						/>
						<p>
							<b>{customer.name}</b>, {customerAge},{isMobileDevice && <br />}{' '}
							{customer.email}
						</p>
					</div>
					<p>
						Login: {customer.login},{isMobileDevice && <br />} Password:{' '}
						{customer.password}
					</p>
				</>
			)}
		</div>
	);
}

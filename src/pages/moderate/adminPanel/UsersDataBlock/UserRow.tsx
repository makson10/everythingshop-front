import { useEffect, useState } from 'react';
import { IUnionUserData } from '@/types/userTypes';

interface Props {
	customer: IUnionUserData;
	isGoogleCustomers?: boolean;
}

export default function UserRow({
	customer,
	isGoogleCustomers = false,
}: Props) {
	const [customerAge, setCustomerAge] = useState<number>(0);
	const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

	useEffect(() => {
		const details = navigator.userAgent;
		const regexp = /android|iphone|kindle|ipad/i;
		setIsMobileDevice(regexp.test(details));
	}, []);

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
						<img className="w-6 max-sm:h-6" src={customer.picture} />
						<p>
							<b>{customer.name}</b>,{isMobileDevice && <br />} {customer.email}
						</p>
						<img src="https://img.icons8.com/color/24/null/google-logo.png" />
					</div>
					<p>ID: {customer.id}</p>
				</>
			) : (
				<>
					<div className="flex flex-row gap-4 items-center">
						<img
							className="w-6 max-sm:h-6"
							src="https://img.icons8.com/windows/120/null/user-male-circle.png"
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

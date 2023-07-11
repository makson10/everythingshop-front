import { ReactNode } from 'react';
import Image from 'next/image';

interface Props {
	iconUrl: string;
	children: ReactNode;
}

export default function ContactRow({ iconUrl, children }: Props) {
	return (
		<div className="flex flex-row justify-center items-center gap-3 max-sm:w-full">
			<div className="max-sm:w-[20%]">
				<Image
					className="w-[48px] h-[48px]"
					src={iconUrl}
					alt="#"
					width={100}
					height={100}
				/>
			</div>
			<p className="text-center max-sm:w-[80%]">{children}</p>
		</div>
	);
}

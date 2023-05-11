import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function HomePageBg({ children }: Props) {
	return (
		<div className="flex flex-col gap-[4rem] text-[#545B5A] bg-[#F6FFDE]">
			{children}
		</div>
	);
}

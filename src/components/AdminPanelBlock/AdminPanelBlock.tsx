import { ReactNode } from 'react';

interface Props {
	blockTitle: string;
	children: ReactNode;
}

export default function AdminPanelBlock({ blockTitle, children }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-[10px] max-sm:w-full">
			<p className="text-center text-[1.6rem] font-bold">{blockTitle}</p>
			<div className="max-h-[400px] rounded-md overflow-x-hidden overflow-y-scroll border-black border-[2px] p-4 flex flex-col gap-[10px] max-sm:h-[300px] dark:bg-white dark:text-black">
				{children}
			</div>
		</div>
	);
}

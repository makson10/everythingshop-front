import { LegacyRef, useEffect, useRef, useState } from 'react';

interface Props {
	errorList: string[];
}

export default function ErrorMenu({ errorList }: Props) {
	const menuRef = useRef<HTMLDivElement>();
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		setTimeout(() => setShow(false), 2000);
	}, []);

	return (
		<div
			className={`z-50 fixed top-[15%] right-0 translate-x-[100%] bg-red-500 text-white w-fit font-semibold py-2 px-4 rounded-md shadow-md transition-all ${
				show && 'translate-x-[0%]'
			}`}
			ref={menuRef as LegacyRef<HTMLDivElement>}>
			<div className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"></path>
				</svg>
				<span className="text-lg">Error!</span>
			</div>
			{errorList.map((error, index) => {
				return (
					<p className="mt-2 text-center" key={index}>
						{error}
					</p>
				);
			})}
		</div>
	);
}
